import React, {Component} from 'react';
import './ListOfIssues.css';
import './CommonStyle.css';

export default class ListOfIssues extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
			issueListArray: [],
			openIssueCount:"",
			closedIssueCount:"",
			tabname:"open",
			searchstring:"",
			allData:[],
			pageNo: "1",
	   	};
	}

	componentDidMount(){
		this.getIssueList();
	}
	
	getIssueList= async()=> {		
		var url = "https://api.github.com/repos/facebook/react/issues?state=all";
		var response = await fetch(url, {
		    method: 'get',
		    headers: {
		      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
		    },
		  });
		var  issueList = await response.json();
		if(issueList){
			var openedIssues = issueList.filter((element,index)=>{
				return element.state==="open";
			})

			var closedIssues = issueList.filter((element,index)=>{
				return element.state==="closed";
			})

			this.setState({
				issueListArray   : openedIssues,
				openIssueCount   : openedIssues.length,
				closedIssueCount : closedIssues.length,
				allData          : issueList,
			})
		}
	};


	getOpenIssues=()=>{
		var allData = this.state.allData;
		var openedIssues = allData.filter((element,index)=>{
			return element.state==="open";
		})
		this.setState({
			issueListArray:openedIssues,
			tabname:"open"
		})
	}

	getClosedIssues=()=>{
		var allData = this.state.allData;
		var closedIssues = allData.filter((element,index)=>{
			return element.state==="closed";
		})
		this.setState({
			issueListArray:closedIssues,
			tabname: "closed"
		})		
	}

	getSearchedData=(e)=> {
		e.preventDefault();
		var name = e.target.name;
		this.setState({
			[name] : e.target.value
		})

		
		
	};

	searchData= (e)=>{
		e.preventDefault();
		var searchedIssueList = (this.state.allData).filter((a)=>{			
			if(((a.title).toUpperCase()).indexOf((this.state.searchstring).toUpperCase())>-1){
				return a
			}
		}); 
		
		if(searchedIssueList){
			var openedIssues = searchedIssueList.filter((element,index)=>{
				return element.state==="open";
			})

			var closedIssues = searchedIssueList.filter((element,index)=>{
				return element.state==="closed";
			})

			this.setState({
				issueListArray:searchedIssueList,
				openIssueCount : openedIssues.length,
				closedIssueCount : closedIssues.length
			})
		}


	}

	getDataByPageNum=(e)=>{
		e.preventDefault();
		this.setState({
			pageNo : e.target.getAttribute('id'),
		},()=>{
			this.getIssueListByPage();
		})
	}

	getIssueListByPage= async()=> {
		var url = "https://api.github.com/repos/facebook/create-react-app/issues?state=all&&page="+(this.state.pageNo)+"&q=is%3Aissue+is%3Aopen";		
		var response = await fetch(url, {
		    method: 'get',
		    headers: {
		      "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
		    },
		  });
		var  issueList = await response.json();
		if(issueList){
			var openedIssues = issueList.filter((element,index)=>{
				return element.state==="open";
			})
			var closedIssues = issueList.filter((element,index)=>{
				return element.state==="closed";
			})
			this.setState({
				issueListArray   : openedIssues,
				openIssueCount   : openedIssues.length,
				closedIssueCount : closedIssues.length,
				allData          : issueList,
			})
		}		
	};

	nextPage=(e)=>{
		e.preventDefault();
		if(parseInt(this.state.pageNo)<5){
			var nextpage = parseInt(this.state.pageNo)+1;
			this.setState({
				pageNo : nextpage.toString()
			},()=>{this.getIssueListByPage()})

		}
	}

	previousPage=(e)=>{
		e.preventDefault();
		if(parseInt(this.state.pageNo)>1){
			var previousPage = parseInt(this.state.pageNo)-1;
			this.setState({
				pageNo : previousPage.toString()
			},()=>{this.getIssueListByPage()})

		}
	}
	

  	render() {
  		const {issueListArray, openIssueCount, closedIssueCount} = this.state
	    return (
	    	<div>
	    		<div className="hdr">   			
					<div className="topnav hdrnavbar col-lg-offset-1 col-lg-11 col-md-12" id="myTopnav">
					  <a href="https://github.com" className="active"><img className="logoimg" src="/githubimg1.png"/></a>
					  <a href="#">Why GitHub?</a>
					  <a href="#">Enterprise</a>
					  <a href="#">Explore</a>
					  <a href="#">Marketplace</a>
					  <a href="#">Pricing</a>
					  <a href="#">					  	
					      <div className="form-group ">
					        <input type="text" className="srchtab" placeholder="is:issue is:open"/>
					        <img src="https://github.githubassets.com/images/search-key-slash.svg" className="srchimg"/>
					      </div>
					  </a>
					  <a href="javascript:void(0);" className="icon" onclick="myFunction()">
					    <i className="fa fa-bars"></i>
					  </a>
					  <a href="https://github.com/login">Sign in</a>
					  <a href="https://github.com/join" className="signup">Sign up</a>
					</div>
	    		</div>
	    		<div className="menubartab col-lg-12 col-md-12 col-xs-12 col-sm-12">
		    		<div className=" row text-left col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-10">
		    			<i className="fa fa-tablet tablet" aria-hidden="true"></i><a className="primarycolor" href="https://github.com/facebook" > facebook/ <b>create-react-app</b></a>
		    		</div>
		    	</div>
		    	<div className="equalheight col-lg-offset-1 col-lg-10 col-lg-offset-1 col-md-10 col-xs-12 col-sm-12">
		    		<h5 className="text-left row col-lg-12 col-md-12 col-xs-12 col-sm-12 fnt">Pinned issues</h5>
		    	
		    		<div className="pinnedissuebox  equalcol text-left col-lg-4 col-md-12 col-xs-12 col-sm-12">
		    			<a className="needhelptitle fnt col-lg-10 col-md-10 col-xs-12 col-sm-12" href="#">Need help? Visit our Spectrum community.</a>
		    			<label className="fnt col-lg-12 col-md-10 col-xs-12 col-sm-12 needhelptitlestatus">#7424 opened on Jul 25 by iansu</label>
		    			<label className="fnt col-lg-12 col-md-10 col-xs-12 col-sm-12 needhelptitlestatusline2">
		    				<span><i className="fa fa-info-circle successicon" aria-hidden="true"></i> &nbsp; Open </span> &nbsp;&nbsp;
		    				<span><i className="fa fa-comment-o" aria-hidden="true"></i> &nbsp;1 </span>
		    			</label>
		    		</div>  
		    		<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 text-left filterbox rightpaddingnone leftpaddingnone">
		    			<div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 filterbox1 leftpaddingnone ">
		    				<div className="input-icons"> 
								<form onSubmit={this.searchData}>
				                	<i className="fa fa-search searchicon icon"></i> 
				                	<input className="input-field" type="text" placeholder=" is:issue is:open" name="searchstring" value={this.state.searchstring} onChange={this.getSearchedData}/> 
				            	</form>
				            </div>
		    			</div>
		    			<div className="col-lg-4 col-md-4 col-xs-12 col-sm-12  filterbox2 leftpaddingnone commonspace">
		    				<span className="labelandmilestone onhover onfocus onfocusbox1  col-lg-6 col-md-6 col-xs-6 col-sm-6"><i className="fa fa-tag" aria-hidden="true"></i> <a href="https://github.com/facebook/create-react-app/labels" className="onhoverpill">Labels <span className="greypill">29</span></a></span>
		    				<span className="labelandmilestone onhover onfocus onfocusbox2 col-lg-6 col-md-6 col-xs-6 col-sm-6"><i className="fa fa-map-signs" aria-hidden="true"></i> <a href="https://github.com/facebook/create-react-app/milestones" className="onhoverpill">Milestones <span className="greypill">5</span></a></span>
		    			</div>
		    		<div className="col-lg-2 col-md-2 col-xs-12 col-sm-12 filterbox3 rightpaddingnone leftpaddingnone commonspace"><button className="btn btn-success col-lg-12 col-md-12 col-xs-12 col-sm-12">New issue</button></div>
		    	</div>

		    		<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12  filterbox leftpaddingnone listmenubar">
		    			<div className="headermenubar col-lg-4 col-md-4 col-sm-12 col-xs-12 text-left">
							<span className={this.state.tabname=="open"?"onhover activetab":"onhover notactive"} onClick={this.getOpenIssues}><i className="fa fa-info-circle" aria-hidden="true"></i> &nbsp; {openIssueCount} Open </span> &nbsp;&nbsp;
		    				<span className={this.state.tabname=="closed"?"onhover activetab":"onhover notactive"} onClick={this.getClosedIssues}><i className="fa fa-check" aria-hidden="true"></i> &nbsp;{closedIssueCount} Closed</span>
		    			</div>
		    			<div className="headermenubar col-lg-8 col-md-8 hidden-xs hidden-sm pull-right">
		    				<div className="col-lg-2 col-md-2 leftpaddingnone rightpaddingnone">
		    					<div className="dropdown">
								  <div className="dropdown-toggle onhover" data-toggle="dropdown">Author
								  <span className="caret"></span></div>
								  <ul className="dropdown-menu ">
								    <li><a href="#">Under costruction</a></li>								    
								  </ul>
								</div>
		    				</div>
		    				<div className="col-lg-2 col-md-2 leftpaddingnone rightpaddingnone">
		    					<div className="dropdown">
								  <div className="dropdown-toggle onhover"  data-toggle="dropdown">Labels
								  <span className="caret"></span></div>
								  <ul className="dropdown-menu ">
								    <li><a href="#">Under costruction</a></li>								    
								  </ul>
								</div>
		    				</div>
		    				<div className="col-lg-2 col-md-2 leftpaddingnone rightpaddingnone">
		    					<div className="dropdown">
								  <div className="dropdown-toggle onhover"  data-toggle="dropdown">Projects
								  <span className="caret"></span></div>
								  <ul className="dropdown-menu ">
								  	<li><a href="#">Under costruction</a></li>
								  </ul>
								</div>
		    				</div>
		    				<div className="col-lg-2 col-md-2 leftpaddingnone rightpaddingnone">
		    					<div className="dropdown">
								  <div className="dropdown-toggle onhover"  data-toggle="dropdown">Milestones
								  <span className="caret"></span></div>
								  <ul className="dropdown-menu ">
								 	<li><a href="#">Under costruction</a></li>
								  </ul>
								</div>
		    				</div>
		    				<div className="col-lg-2 col-md-2 leftpaddingnone rightpaddingnone">
		    					<div className="dropdown">
								  <div className="dropdown-toggle onhover"  data-toggle="dropdown">Assignee
								  <span className="caret"></span></div>
								  <ul className="dropdown-menu ">
								  	<li><a href="#">Under costruction</a></li>
								  </ul>
								</div>
		    				</div>
		    				<div className="col-lg-2 col-md-2 leftpaddingnone rightpaddingnone">
		    					<div className="dropdown">
								  <div className="dropdown-toggle onhover" data-toggle="dropdown">Sort
								  <span className="caret"></span></div>
								  <ul className="dropdown-menu ">
								  	<li><a href="#">Under costruction</a></li>
								  </ul>
								</div>
		    				</div>
		    			</div>
		    		</div>
		    		{
		    			issueListArray.length>0?
		    			issueListArray.map((issuelist,index)=>{
		    				var labelArray = issuelist.labels;
							var dt1 = new Date(issuelist.updated_at);
							var dt2 = new Date();
							var diff =(dt2.getTime() - dt1.getTime()) / 1000;
							diff /= (60 * 60);
							var totalHours=  Math.abs(Math.round(diff));
		    				return(	    			
					    		<div key={index} className="col-lg-12 col-md-12 col-xs-12 col-sm-12 leftpaddingnone issuelist onlastfocus onfocus">
					    			<div className="headermenubar col-lg-11 col-md-11 col-sm-12 col-xs-12 text-left"> 
										<p>
											{issuelist.state=="open"?<i className="fa fa-info-circle successicon" aria-hidden="true"></i>:<i className="fa fa-exclamation-circle dangericon" aria-hidden="true"></i>} &nbsp;
											
											<a className="needhelptitle fnt" href={"https://github.com/facebook/create-react-app/issues/"+issuelist.number}>{(issuelist.title).charAt(0).toUpperCase()+(issuelist.title).slice(1)}</a>
											{
												labelArray.length>0?
												labelArray.map((label,ind)=>{
													return(
														<span key={ind} className="orangecolor" style={{backgroundColor:"#"+label.color}} title={label.name}><a className="onhoverpill" href={"https://github.com/facebook/create-react-app/issues?q=is%3Aissue+is%3Aopen+label%3A%22"+((label.name).replace(' ','+'))+"%22"}>{label.name}</a></span>
													)

												})
												:
												null
											}
										</p>
										{issuelist.state=="open"?
											<p className="col-lg-12 col-md-12 ">#{issuelist.number} opened {totalHours} hours ago by <a className="needhelptitlelist" href={"https://github.com/facebook/create-react-app/issues/created_by/"+issuelist.user.login} title={"issue opened by "+issuelist.user.login}>{issuelist.user.login}</a></p>
					    					:
					    					<p className="col-lg-12 col-md-12 ">#{issuelist.number} by <a className="needhelptitlelist" href={"https://github.com/facebook/create-react-app/issues/created_by/"+issuelist.user.login}>{issuelist.user.login}</a> was closed {totalHours} hours ago</p>
					    				}
					    			</div>
					    			{
					    				issuelist.comments>0?
						    			<div  className="headermenubar col-lg-1 col-md-1 hidden-xs hidden-sm pull-right onhover">
						    				<span><a className="onhoverpill" href={"https://github.com/facebook/create-react-app/issues/"+issuelist.number}><i className="fa fa-comment-o commenthover" aria-hidden="true"></i> &nbsp; {issuelist.comments}</a> </span> &nbsp;&nbsp;				
						    			</div>
						    			:
						    			null
					    			}
					    		</div>
					    	)
			    		})
			    		:
			    		<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 leftpaddingnone issuelist text-center">
			    			<i className="fa fa-info-circle"></i>
			    			<h2>No results matched your search.</h2>
			    			<h4>You could search <a href="https://github.com/search">all of GitHub</a> or try an <a href="https://github.com/search/advanced">advanced search.</a></h4>
			    		</div>

			    	}
		    	</div>
		    	<div className="text-center">
			    	<nav aria-label="...">
					  <ul className="pagination">
					    <li className="page-item">
					      <a className="page-link" href="#" tabindex="-1" onClick={this.previousPage}>Previous</a>
					    </li>
					    <li className={this.state.pageNo=="1"?"page-item active":"page-item"}><a className="page-link" href="#" id="1" onClick={this.getDataByPageNum}>1</a></li>
					    <li className={this.state.pageNo=="2"?"page-item active":"page-item"}>
					      <a className="page-link" href="#" id="2" onClick={this.getDataByPageNum}>2 <span className="sr-only">(current)</span></a>
					    </li>
					    <li className={this.state.pageNo=="3"?"page-item active":"page-item"}><a className="page-link" href="#" id="3" onClick={this.getDataByPageNum}>3</a></li>
					    <li className={this.state.pageNo=="4"?"page-item active":"page-item"}><a className="page-link" href="#" id="4" onClick={this.getDataByPageNum}>4</a></li>
					    <li className={this.state.pageNo=="5"?"page-item active":"page-item"}><a className="page-link" href="#" id="5" onClick={this.getDataByPageNum}>5</a></li>
					    <li className="page-item">
					      <a className="page-link" href="#" onClick={this.nextPage}>Next</a>
					    </li>
					  </ul>
					</nav>
				</div>
				<div className="col-lg-offset-1 col-lg-10 col-md-offset-1 col-md-12 col-xs-12 col-sm-12 ">
					<div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 footerbox">
						<div className="leftaside col-lg-6 col-md-12 col-xs-12 col-sm-12">
							<span className="footertabs">© 2019 GitHub, Inc.</span>
							<a href="https://help.github.com/en/github/site-policy/github-terms-of-service" className="footertabs">Terms</a>
							<a href="https://help.github.com/en/github/site-policy/github-privacy-statement" className="footertabs">Privacy</a>
							<a href="https://github.com/security" className="footertabs">Security</a>
							<a href="https://www.githubstatus.com/" className="footertabs">Status</a>
							<a href="https://help.github.com/en" className="footertabs">Help</a>
						</div>
						<div className="footericon col-lg-1 col-md-12 col-sm-12 col-xs-12"><img className="footerimg" src="/githubimg.png" /></div>
						<div className="rightside pull-right col-lg-5 col-md-12 col-xs-12 col-sm-12">
							<a href="https://support.github.com/" className="footertabs">Contact GitHub</a>
							<a href="https://github.com/pricing" className="footertabs">Pricing</a>
							<a href="https://developer.github.com/" className="footertabs">API</a>
							<a href="https://services.github.com/" className="footertabs">Training</a>
							<a href="https://github.blog/" className="footertabs">Blog</a>
							<a href="https://github.com/about" className="footertabs">About</a>
						</div>
					</div>
				</div>
		    </div>
	    );
	}
}
