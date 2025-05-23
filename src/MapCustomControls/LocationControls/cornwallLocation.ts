function addCornwallLocation(
  map: maplibregl.Map,
  dropdown: HTMLDivElement,
  setSelectedLocation: (location: string) => void
) {
  const cornwallItem = document.createElement("div");
  cornwallItem.textContent = "Cornwall";
  cornwallItem.style.setProperty(
    "font-family",
    "'Exo 2', sans-serif",
    "important"
  );
  cornwallItem.style.padding = "10px";
  cornwallItem.style.cursor = "pointer";
  cornwallItem.style.borderBottom = "1px solid #e0e0e0";
  cornwallItem.addEventListener("mouseenter", () => {
    cornwallItem.style.backgroundColor = "#f0f0f0";
  });
  cornwallItem.addEventListener("mouseleave", () => {
    cornwallItem.style.backgroundColor = "white";
  });
  cornwallItem.addEventListener("click", (e) => {
    e.stopPropagation();
    // Update the selected location using the setter function
    setSelectedLocation("Cornwall");
    console.log("Location selected:", "Cornwall");

    map.flyTo({
      center: [-74.707, 45.04946],
      zoom: 16,
      speed: 2,
      pitch: 45,
      bearing: -118,
      curve: 1,
      easing: (t: any) => t,
    });
    dropdown.style.display = "none"; // Hide dropdown after selection
  });
  dropdown.appendChild(cornwallItem);
}

export default addCornwallLocation;
