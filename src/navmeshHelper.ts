import * as THREE from "three";

function createConvexRegionHelper(navMesh: any) {
  const group = new THREE.Group();

  // Debug info
  console.log("NavMesh:", navMesh);
  console.log("Regions:", navMesh.regions);
  console.log("Region count:", navMesh.regions?.length);

  if (!navMesh.regions || navMesh.regions.length === 0) {
    console.error("No regions found in navMesh");
    return group;
  }

  // Create a mesh for each region with a different color
  for (let i = 0; i < navMesh.regions.length; i++) {
    const region = navMesh.regions[i];
    const color = new THREE.Color(Math.random() * 0xffffff);

    const material = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide,
      wireframe: false,
    });

    // Check if we have points or edges
    if (region.points && region.points.length > 0) {
      // Use points directly if available
      const geometry = new THREE.BufferGeometry();
      const vertices = [];

      for (let j = 0; j < region.points.length; j++) {
        const point = region.points[j];
        vertices.push(point.x, point.y, point.z);
      }

      // Create triangulation
      const indices = [];
      for (let j = 1; j < region.points.length - 1; j++) {
        indices.push(0, j, j + 1);
      }

      geometry.setIndex(indices);
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(vertices, 3)
      );
      geometry.computeVertexNormals();

      const mesh = new THREE.Mesh(geometry, material);
      group.add(mesh);
    } else if (region.edge) {
      // Use edge traversal if points aren't available
      try {
        const geometry = new THREE.BufferGeometry();
        const positions = [];

        // Collect all vertices by traversing edges
        const vertices = [];
        let edge = region.edge;
        const startEdge = edge;

        do {
          if (edge.vertex) {
            vertices.push(edge.vertex);
          }
          edge = edge.next;
        } while (edge !== startEdge);

        // Can't triangulate fewer than 3 vertices
        if (vertices.length < 3) {
          console.warn("Region has fewer than 3 vertices, skipping");
          continue;
        }

        // Simple triangulation (fan)
        for (let j = 1; j < vertices.length - 1; j++) {
          positions.push(
            vertices[0].x,
            vertices[0].y,
            vertices[0].z,
            vertices[j].x,
            vertices[j].y,
            vertices[j].z,
            vertices[j + 1].x,
            vertices[j + 1].y,
            vertices[j + 1].z
          );
        }

        geometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(positions, 3)
        );
        geometry.computeVertexNormals();

        const mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
      } catch (error) {
        console.error("Error processing region:", error);
      }
    } else {
      console.warn("Region has no points or edges, skipping");
    }
  }

  // Add wireframe outline for better visibility
  const wireframeGroup = new THREE.Group();
  for (let i = 0; i < navMesh.regions.length; i++) {
    const region = navMesh.regions[i];

    if (region.points && region.points.length > 0) {
      const wireGeometry = new THREE.BufferGeometry();
      const wirePositions = [];

      // Create lines for each edge
      for (let j = 0; j < region.points.length; j++) {
        const point1 = region.points[j];
        const point2 = region.points[(j + 1) % region.points.length];

        wirePositions.push(
          point1.x,
          point1.y,
          point1.z,
          point2.x,
          point2.y,
          point2.z
        );
      }

      wireGeometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(wirePositions, 3)
      );

      const wireMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
      const wireframe = new THREE.LineSegments(wireGeometry, wireMaterial);
      wireframeGroup.add(wireframe);
    }
  }

  group.add(wireframeGroup);
  return group;
}

export { createConvexRegionHelper };
