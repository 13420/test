window.onload = function() {
  const params = new URLSearchParams(location.search);
  const path = JSON.parse(decodeURIComponent(params.get('path')));

  const map = new TMap.Map("container", {
    center: new TMap.LatLng(path[0].lat, path[0].lng),
    zoom: 5,
    pitch: 0,
    rotation: 0,
    mapStyleId: "style1"
  });

  // 放大地图地名字体
  map.setMapStyle({
    "featureType": "all",
    "elementType": "labels.text.fill",
    "stylers": {
      "fontSize": "16px",
      "color": "#ffffff"
    }
  });

  // 画城市点
  new TMap.MultiMarker({
    map,
    geometries: path.map(p => ({
      id: p.city,
      position: new TMap.LatLng(p.lat, p.lng)
    }))
  });

  // H5 悬浮按钮截图
  document.getElementById("captureBtn").addEventListener("click", async () => {
    const canvas = await html2canvas(document.querySelector("#container"), {
      useCORS: true,
      scale: 2
    });
    const imgData = canvas.toDataURL("image/png");
    window.parent.postMessage({ type: "screenshot", img: imgData }, "*");
  });
};