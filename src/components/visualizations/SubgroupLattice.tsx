import { useEffect, useRef, useState, useMemo } from 'react';
import * as d3 from 'd3';
import type { Group } from '../../lib/types/algebra';
import { createZn, generateSubgroup, isNormalSubgroup } from '../../lib/algebra/groups';

interface SubgroupNode {
  id: string;
  elements: string[];
  order: number;
  isNormal: boolean;
  x?: number;
  y?: number;
}

interface SubgroupLink {
  source: string;
  target: string;
  index: number;
}

interface SubgroupLatticeProps<T> {
  group: Group<T>;
  width?: number;
  height?: number;
}

// Find all subgroups of a group (brute force for small groups)
function findAllSubgroups<T>(group: Group<T>): T[][] {
  const subgroups: T[][] = [];
  const seen = new Set<string>();

  // Always include trivial subgroup {e}
  subgroups.push([group.identity]);
  seen.add(group.toString(group.identity));

  // Generate subgroups from each element
  for (const g of group.elements) {
    const subgroup = generateSubgroup(group, [g]);
    const key = subgroup.map(e => group.toString(e)).sort().join(',');
    if (!seen.has(key)) {
      seen.add(key);
      subgroups.push(subgroup);
    }
  }

  // Generate subgroups from pairs of elements
  for (let i = 0; i < group.elements.length; i++) {
    for (let j = i + 1; j < group.elements.length; j++) {
      const subgroup = generateSubgroup(group, [group.elements[i], group.elements[j]]);
      const key = subgroup.map(e => group.toString(e)).sort().join(',');
      if (!seen.has(key)) {
        seen.add(key);
        subgroups.push(subgroup);
      }
    }
  }

  return subgroups.sort((a, b) => a.length - b.length);
}

// Check if H is a subgroup of K
function isSubgroupOf<T>(group: Group<T>, H: T[], K: T[]): boolean {
  if (H.length > K.length) return false;
  const kSet = new Set(K.map(e => group.toString(e)));
  return H.every(h => kSet.has(group.toString(h)));
}

// Build the Hasse diagram structure
function buildLattice<T>(group: Group<T>, subgroups: T[][]): { nodes: SubgroupNode[]; links: SubgroupLink[] } {
  const nodes: SubgroupNode[] = subgroups.map((sg, i) => ({
    id: `sg-${i}`,
    elements: sg.map(e => group.toString(e)),
    order: sg.length,
    isNormal: isNormalSubgroup(group, sg),
  }));

  const links: SubgroupLink[] = [];

  // Find covering relations (direct subgroup relationships)
  for (let i = 0; i < subgroups.length; i++) {
    for (let j = i + 1; j < subgroups.length; j++) {
      if (isSubgroupOf(group, subgroups[i], subgroups[j])) {
        // Check if this is a covering relation (no intermediate subgroup)
        let isCovering = true;
        for (let k = 0; k < subgroups.length; k++) {
          if (k !== i && k !== j) {
            if (isSubgroupOf(group, subgroups[i], subgroups[k]) &&
                isSubgroupOf(group, subgroups[k], subgroups[j])) {
              isCovering = false;
              break;
            }
          }
        }
        if (isCovering) {
          links.push({
            source: `sg-${i}`,
            target: `sg-${j}`,
            index: subgroups[j].length / subgroups[i].length,
          });
        }
      }
    }
  }

  return { nodes, links };
}

export function SubgroupLattice<T>({ group, width = 500, height = 400 }: SubgroupLatticeProps<T>) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<SubgroupNode | null>(null);

  const { nodes, links } = useMemo(() => {
    const subgroups = findAllSubgroups(group);
    return buildLattice(group, subgroups);
  }, [group]);

  useEffect(() => {
    if (!svgRef.current || nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Group nodes by order for layered layout
    const orderGroups = new Map<number, SubgroupNode[]>();
    nodes.forEach(node => {
      const order = node.order;
      if (!orderGroups.has(order)) {
        orderGroups.set(order, []);
      }
      orderGroups.get(order)!.push(node);
    });

    // Position nodes in layers
    const orders = Array.from(orderGroups.keys()).sort((a, b) => a - b);
    const layerHeight = innerHeight / (orders.length - 1 || 1);

    orders.forEach((order, layerIndex) => {
      const nodesInLayer = orderGroups.get(order)!;
      const layerWidth = innerWidth / (nodesInLayer.length + 1);
      nodesInLayer.forEach((node, nodeIndex) => {
        node.x = layerWidth * (nodeIndex + 1);
        node.y = innerHeight - layerIndex * layerHeight;
      });
    });

    // Create node lookup
    const nodeMap = new Map(nodes.map(n => [n.id, n]));

    // Draw links
    g.selectAll('.link')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('x1', d => nodeMap.get(d.source)?.x || 0)
      .attr('y1', d => nodeMap.get(d.source)?.y || 0)
      .attr('x2', d => nodeMap.get(d.target)?.x || 0)
      .attr('y2', d => nodeMap.get(d.target)?.y || 0)
      .attr('stroke', '#475569')
      .attr('stroke-width', 2);

    // Draw index labels on links
    g.selectAll('.index-label')
      .data(links)
      .enter()
      .append('text')
      .attr('class', 'index-label')
      .attr('x', d => {
        const s = nodeMap.get(d.source);
        const t = nodeMap.get(d.target);
        return ((s?.x || 0) + (t?.x || 0)) / 2 + 8;
      })
      .attr('y', d => {
        const s = nodeMap.get(d.source);
        const t = nodeMap.get(d.target);
        return ((s?.y || 0) + (t?.y || 0)) / 2;
      })
      .attr('fill', '#64748b')
      .attr('font-size', '10px')
      .text(d => d.index > 1 ? d.index.toString() : '');

    // Draw nodes
    const nodeGroups = g.selectAll('.node')
      .data(nodes)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .style('cursor', 'pointer')
      .on('click', (_, d) => setSelectedNode(d));

    // Node circles
    nodeGroups.append('circle')
      .attr('r', d => 8 + Math.log2(d.order + 1) * 4)
      .attr('fill', d => d.isNormal ? '#22c55e' : '#6366f1')
      .attr('stroke', '#1e293b')
      .attr('stroke-width', 2)
      .on('mouseover', function() {
        d3.select(this).attr('stroke', '#f8fafc').attr('stroke-width', 3);
      })
      .on('mouseout', function() {
        d3.select(this).attr('stroke', '#1e293b').attr('stroke-width', 2);
      });

    // Node labels (order)
    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold')
      .text(d => d.order);

  }, [nodes, links, width, height]);

  return (
    <div className="demo-container">
      <h4 className="text-lg font-semibold mb-4">Subgroup Lattice of {group.name}</h4>

      <div className="flex flex-col lg:flex-row gap-4">
        <div className="bg-dark-950 rounded-lg overflow-hidden">
          <svg ref={svgRef} width={width} height={height} />
        </div>

        <div className="flex-1 space-y-4">
          <div className="text-sm space-y-2">
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-primary-500 inline-block" />
              <span className="text-dark-300">Subgroup</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-green-500 inline-block" />
              <span className="text-dark-300">Normal subgroup</span>
            </p>
            <p className="text-dark-500 text-xs">
              Numbers on edges show the index [K:H]
            </p>
          </div>

          {selectedNode && (
            <div className="p-4 bg-dark-800 rounded-lg">
              <h5 className="font-semibold mb-2">
                Subgroup of order {selectedNode.order}
                {selectedNode.isNormal && (
                  <span className="text-green-400 text-sm ml-2">(Normal)</span>
                )}
              </h5>
              <p className="font-mono text-sm text-primary-400">
                {'{' + selectedNode.elements.join(', ') + '}'}
              </p>
            </div>
          )}

          <div className="text-xs text-dark-500">
            <p>Click on nodes to see subgroup elements.</p>
            <p>Total subgroups: {nodes.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Demo wrapper with group selector
export function SubgroupLatticeDemo() {
  const [n, setN] = useState(6);

  const group = useMemo(() => createZn(n), [n]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <label className="text-sm text-dark-400">Group: Z</label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(Math.max(1, Math.min(16, parseInt(e.target.value) || 1)))}
            min={1}
            max={16}
            className="input w-20"
          />
        </div>
      </div>

      <p className="text-sm text-dark-400">
        Showing subgroup lattice of Z<sub>{n}</sub>.
        Subgroups of Z<sub>n</sub> correspond to divisors of n.
      </p>

      <SubgroupLattice group={group} />
    </div>
  );
}
