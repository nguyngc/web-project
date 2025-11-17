import Hero from "../components/Hero";
import ContactSection from "../components/ContactSection";

function NotFound() {
  return (
    <div>
      <Hero page="404" />
      <div className="text-center py-10">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
}

export default NotFound;