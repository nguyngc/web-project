import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function WebMap() {
  const center = { lat: 60.221, lng: 25.05 };

  return (
    <div className="w-full h-[500px] rounded-xl ">
      <LoadScript
        googleMapsApiKey="AIzaSyBhgfiLCrT5Tr9vtenr_E9p88COb3wzyPc"
        language="en"   
        region="US"     
      >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={{ lat: 60.221, lng: 25.05 }}
        zoom={16}
        options={{
          mapTypeId: "roadmap",
          disableDefaultUI: true,
        }}
      >
        <Marker position={{ lat: 60.221, lng: 25.05 }} />
      </GoogleMap>

    </LoadScript>
    </div >
  );
}

export default WebMap;
