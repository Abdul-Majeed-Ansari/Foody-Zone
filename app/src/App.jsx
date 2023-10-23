import styled from "styled-components";
import "./App.css";
import { useEffect, useState } from "react";
import SearchResults from "./components/SearchResults/SearchResults";

export const BASE_URL = "http://localhost:9000";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFilteredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch data");
      }
    };

    fetchFoodData();
  }, []);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if (searchValue === "") {
      setFilteredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  const filteredFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filteredBtns = [
    { name: "All", type: "all" },
    { name: "Breakfast", type: "breakfast" },
    { name: "Lunch", type: "lunch" },
    { name: "Dinner", type: "dinner" },
  ];

  if (error) return <div>{error}</div>;
  if (loading) return <div>Loading...</div>;
  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="/logo.svg" alt="logo" />
          </div>
          <div className="search">
            <input onChange={searchFood} placeholder="Search Food..." />
          </div>
        </TopContainer>

        <FilterContainer>
          {filteredBtns?.map((value) => (
            <Button
              key={value.name}
              isSelected={selectedBtn === value.type}
              onClick={() => filteredFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilterContainer>
      </Container>
      <SearchResults data={filteredData} />
    </>
  );
}

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  /* background-color: #323334; */
  color: white;
`;

const TopContainer = styled.section`
  height: 140px;
  padding: 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid red;
      border-radius: 5px;
      height: 40px;
      padding: 5px;
      outline: none;
      color: white;
    }

    input::placeholder {
      color: white;
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 110px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  padding-bottom: 20px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "red" : "#ff4343")};
  outline: 1px solid ${({ isSelected }) => (isSelected ? "white" : "#ff4343")};
  color: white;
  width: 80px;
  height: 31px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: red;
  }
`;
