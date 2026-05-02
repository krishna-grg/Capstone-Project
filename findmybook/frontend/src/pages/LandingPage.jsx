import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LandingNavbar from "../components/landing/LandingNavbar";
import LandingHero from "../components/landing/LandingHero";
import SearchCard from "../components/landing/SearchCard";
import BookResults from "../components/landing/BookResults";
import FeatureCards from "../components/landing/FeatureCards";
import LandingFooter from "../components/landing/LandingFooter";
import "../styles/landing.css";

import { API_BASE_URL } from "../api/config";

function LandingPage() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [message, setMessage] = useState("");

  const [startNode, setStartNode] = useState("NODE_ENTRANCE_MAIN");

  const navigate = useNavigate();

  async function searchBooks() {
    setMessage("");
    setBooks([]);

    if (!query.trim()) {
      setMessage("Enter a title.");
      return;
    }

    try {
      const response = await fetch(
  `${API_BASE_URL}/books/search/title?q=${encodeURIComponent(query)}`
);

      if (!response.ok) {
        setMessage(`Search failed: ${response.status}`);
        return;
      }

      const data = await response.json();
      setBooks(data);

      if (data.length === 0) {
        setMessage("No books found.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Could not connect to backend.");
    }
  }

  function openMap(bookId) {
    navigate(`/map/${bookId}?start=${startNode}`);
  }

  return (
    <div className="landing-page">
      <LandingNavbar />
      <LandingHero />

      <SearchCard
        query={query}
        setQuery={setQuery}
        startNode={startNode}
        setStartNode={setStartNode}
        searchBooks={searchBooks}
        message={message}
      />

      <BookResults books={books} openMap={openMap} />

      <FeatureCards />

      <LandingFooter />
    </div>
  );
}

export default LandingPage;