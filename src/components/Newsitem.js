import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
    
    let {Title,description,imageurl,newsurl,author,date,source}=this.props;
    return (
      
      <div className='my-3'>
      <div className="card">
        <div style={{position:'absolute',display:'flex',justifyContent:'flex-end',right:'0'}}>
      <span className="badge rounded-pill bg-danger">{source}</span></div>
        <img src={imageurl?imageurl:"https://static.toiimg.com/photo/111921558.cms"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{Title}</h5>
          <p className="card-text">{description}</p>
          <p class="card-text"><small class="text-body-secondary">By {!author?"unknown":author} on {new Date(date).toUTCString()}</small></p>
          <a href={newsurl} target="blank" className="btn btn-dark">Read More</a>
        </div>
      </div>
      </div>
    )
  }
}
