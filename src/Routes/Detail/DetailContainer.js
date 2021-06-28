import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.state = {
      result: null,
      error: null,
      imdb_id: null,
      loading: true,
      isMovie: pathname.includes("/movie/")
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      },
      history: { push }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      return push("/");
    }
    
    try {
      if (isMovie) {
        const { data: result } = await moviesApi.movieDetail(parsedId);
        const { data: casts  } = await moviesApi.movieCredits(parsedId);

        return this.setState({ result, casts })
      } else {
        const { data: result } = await tvApi.showDetail(parsedId);
        const { data: { imdb_id } } = await tvApi.tvImdb(parsedId);
        const { data: casts  } = await tvApi.tvCredits(parsedId)
        
        return this.setState({ result, imdb_id, casts })
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    const { result, error, loading, isMovie, imdb_id, casts } = this.state
    return <DetailPresenter result={result} error={error} loading={loading} isMovie={isMovie} imdb_id={imdb_id} casts={casts} />;
  }
}