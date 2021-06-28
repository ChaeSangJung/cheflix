import React, {useState} from "react";
import SearchPresenter from "./SearchPresenter";
import { moviesApi, tvApi } from "../../api";

// export default class extends React.Component {
//   state = {
//     movieResults: null,
//     tvResults: null,
//     searchTerm: "",
//     loading: false,
//     error: null
//   };

//   handleSubmit = event => {
//     event.preventDefault();
//     const { searchTerm } = this.state;
    
//     if (searchTerm !== "") {
//       this.searchByTerm();
//     }
//   };

//   updateTerm = event => {
//     const {
//       target: { value }
//     } = event;
    
//     this.setState({
//       searchTerm: value
//     });
//   };

//   searchByTerm = async () => {
//     const { searchTerm } = this.state;
//     this.setState({ loading: true });
//     try {
//       const {
//         data: { results: movieResults }
//       } = await moviesApi.search(searchTerm);
//       const {
//         data: { results: tvResults }
//       } = await tvApi.search(searchTerm);
//       this.setState({
//         movieResults,
//         tvResults
//       });
//     } catch {
//       this.setState({ error: "Can't find results." });
//     } finally {
//       this.setState({ loading: false });
//     }
//   };

//   render() {
//     const { movieResults, tvResults, searchTerm, loading, error } = this.state;
//     return (
//       <SearchPresenter
//         movieResults={movieResults}
//         tvResults={tvResults}
//         loading={loading}
//         error={error}
//         searchTerm={searchTerm}
//         handleSubmit={this.handleSubmit}
//         updateTerm={this.updateTerm}
//       />
//     );
//   }
// }


const SearchContainer = () => {
  const [movieResults, setMovieResults] = useState(null);
  const [tvResults, setTvResults] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null);

  const searchByTerm = async () => {
    console.log(searchTerm)
    setLoading(true);
    try {
      const {
        data: { results: movieResults }
      } = await moviesApi.search(searchTerm);
      const {
        data: { results: tvResults }
      } = await tvApi.search(searchTerm);
      setMovieResults(movieResults);
      setTvResults(tvResults, tvResults);
      console.log(movieResults, tvResults)
    } catch {
      setError("Can't find results.")
    } finally {
      setLoading(false);
    }
  }
  const handleSubmit = event => {
    event.preventDefault();
    if (searchTerm !== "") {
      searchByTerm();
    }
  };

  const updateTerm = event => {
    const {
      target: { value }
    } = event;
    
    setSearchTerm(value);
  };
  return (
    <SearchPresenter 
      movieResults={movieResults} 
      tvResults={tvResults} 
      loading={loading} 
      error={error}
      searchTerm={searchTerm}
      updateTerm={updateTerm} 
      handleSubmit={handleSubmit}
    />
  )
}

export default SearchContainer;