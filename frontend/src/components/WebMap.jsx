import { GoogleMap, LoadScript } from "@react-google-maps/api";

function WebMap() {
  const center = { lat: 60.221, lng: 25.05 };

  // Hàm chạy khi bản đồ load xong
  const onLoad = (map) => {
    // Tạo marker mới theo chuẩn AdvancedMarkerElement
    new google.maps.marker.AdvancedMarkerElement({
      position: center,
      map,
      title: "My Marker",
    });

    // Ví dụ marker tùy chỉnh bằng HTML
    const customElement = document.createElement("div");
    customElement.innerHTML = `
      <div style="padding:4px 8px;background:#159EEC;color:white;border-radius:6px;font-size:12px;">
        📍 Custom Marker
      </div>
    `;

    new google.maps.marker.AdvancedMarkerElement({
      position: { lat: 60.222, lng: 25.052 },
      map,
      content: customElement,
    });
  };

  return (
    <div className="w-full h-[500px] rounded-xl">
      <LoadScript googleMapsApiKey="AIzaSyBhgfiLCrT5Tr9vtenr_E9p88COb3wzyPc"
        libraries={["marker"]}
        language="En"
      >
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={center}
          zoom={16}
          onLoad={onLoad}
          options={{
            mapTypeId: "roadmap",
            disableDefaultUI: true,
          }}
        />
      </LoadScript>
    </div>
  );
}

export default WebMap;
