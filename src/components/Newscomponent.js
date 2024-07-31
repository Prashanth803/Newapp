import React, { Component } from 'react'
import Newsitem from './Newsitem'
import Loading from './loading';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
export default class Newscomponent extends Component {
  static defaultProps={
    country:'in',
    pageSize:8,
    category:"general"
  }
  static propTypes={
    country:PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string
  }
  capitalize=(s)=>{
    return s.charAt(0).toUpperCase()+s.slice(1);
  }
  constructor(props){
    super(props);
    this.state = {
      article:[],
      loading:false,
      page:1,
      totalResults:0
    }
    document.title=`${this.capitalize(props.category)}-News`
  }
  // "https://newsapi.org/v2/top-headlines?country=in&apiKey=33957fc8ae984bc69bb62e3388f1caeb&page=1"
  async updatenews(){
    this.props.setprogress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=33957fc8ae984bc69bb62e3388f1caeb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});let data=await fetch(url);
    let parseddata=await data.json();
    this.setState({
      article:parseddata.articles,
      totalResults:parseddata.totalResults,
      loading:false
    })
    this.props.setprogress(100);
  }
  async componentDidMount(){
    this.updatenews();
  }
  handleprev=async ()=>{
    this.setState({page:this.state.page-1})
    this.updatenews();
  }
  handlenext=async()=>{
   
   this.setState({page:this.state.page+1})
   this.updatenews();
  }
  fetchMoreData=async ()=>{
    this.setState({
      page:this.state.page+1,
    })
    let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=33957fc8ae984bc69bb62e3388f1caeb&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   let data=await fetch(url);
    let parseddata=await data.json();
    this.setState({
      article:this.state.article.concat(parseddata.articles),
      totalResults:parseddata.totalResults,
    })
    
  }
  render() {
    return (
      <>
        <h2 className='text-center'>Top Headlines from {this.capitalize(this.props.category)} category</h2>
        {this.state.loading&&<Loading/>}
        <InfiniteScroll
          dataLength={this.state.article.length}
          next={this.fetchMoreData}
          hasMore={this.state.article.length!==this.state.totalResults}
          loader={<loading/>}>
            <div className="container">
        <div className='row'>
          {this.state.article.map((ele) => {
            return (
              <div className="col-md-4" key={ele.url}>
                <Newsitem key={ele.url} Title={ele.title} description={ele.description} imageurl={ele.urlToImage} newsurl={ele.url} author={ele.author} date={ele.publishedAt} source={ele.source.name}/>
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
        <button disabled={this.state.page<=1} className="mx-3 my-3 btn btn-dark" type="button" onClick={this.handleprev} >	&larr; Previous</button>
        <button disabled={this.state.page+1>Math.ceil(this.state.totalresult/this.props.pageSize)} className="mx-3 my-3 btn btn-dark" type="button" onClick={this.handlenext}>Next &rarr;</button>
        </div> */}
      </>
    );
  }
}