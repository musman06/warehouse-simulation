function addCasaGrandeLocation(
  map: maplibregl.Map,
  dropdown: HTMLDivElement,
  setSelectedLocation: (location: string) => void
) {
  const casaGrandeItem = document.createElement("div");
  casaGrandeItem.textContent = "Casa Grande";
  casaGrandeItem.style.setProperty(
    "font-family",
    "'Exo 2', sans-serif",
    "important"
  );
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
    // Update the selected location using the setter function
    setSelectedLocation("Casa Grande");
    console.log("Location selected:", "Casa Grande");

    map.flyTo({
      center: [-111.77060200008945, 32.86684249587934],
      zoom: 16,
      speed: 2,
      pitch: 45,
      bearing: -90,
      curve: 1,
      easing: (t: any) => t,
    });
    dropdown.style.display = "none"; // Hide dropdown after selection
  });
  dropdown.appendChild(casaGrandeItem);
}

export default addCasaGrandeLocation;
