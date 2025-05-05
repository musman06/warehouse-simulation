function addCasaGrandeLocation(
  locationSelected: string,
  map: maplibregl.Map,
  dropdown: HTMLDivElement,
  currentPositionButtonText: HTMLSpanElement
) {
  const casaGrandeItem = document.createElement("div");
  casaGrandeItem.textContent = "Casa Grande";
  casaGrandeItem.style.padding = "10px";
  casaGrandeItem.style.cursor = "pointer";
  casaGrandeItem.style.borderBottom = "1px solid #e0e0e0";
  casaGrandeItem.addEventListener("mouseenter", () => {
    casaGrandeItem.style.backgroundColor = "#f0f0f0";
  });
  casaGrandeItem.addEventListener("mouseleave", () => {
    casaGrandeItem.style.backgroundColor = "white";
  });
  casaGrandeItem.addEventListener("click", (e) => {
    e.stopPropagation();
    // Set locationSelected value when Casa Grande is clicked
    locationSelected = "Casa Grande";
    console.log("Location selected:", locationSelected);

    map.flyTo({
      center: [-111.77060200008945, 32.86688980631886],
      zoom: 17,
      speed: 2,
      pitch: 30,
      bearing: -90,
      curve: 1,
      easing: (t: any) => t,
    });
    dropdown.style.display = "none"; // Hide dropdown after selection

    // Update button text to show selected location
    currentPositionButtonText.textContent = locationSelected;
  });
  dropdown.appendChild(casaGrandeItem);
}

export { addCasaGrandeLocation };
