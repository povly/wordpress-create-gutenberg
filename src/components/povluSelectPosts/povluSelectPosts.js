import {__} from "@wordpress/i18n";
import {Component} from "@wordpress/element";
import {registerBlockType} from "@wordpress/blocks";
import {SelectControl} from '@wordpress/components';
import {useBlockProps,InspectorControls} from "@wordpress/block-editor";
import apiFetch from '@wordpress/api-fetch';
import postBlockMetadata from "./post-block.json";

class povluSelectPosts extends Component {
	static getInitialState(selectedPost) {
		return {
			posts: [],
			selectedPost: selectedPost,
			post: {},
		};
	}

	constructor() {
		super(...arguments);
		this.state = this.constructor.getInitialState(this.props.attributes.selectedPost);
		this.getOptions = this.getOptions.bind(this);
		this.getOptions();
		this.onChangeSelectPost = this.onChangeSelectPost.bind(this);
	}

	getOptions(){
		return apiFetch({path: '/wp/v2/posts'}).then((posts)=> {
			if (posts && 0 !== this.state.selectedPost){
				const post = posts.find((item)=>{return item.id == this.state.selectedPost});
				this.setState({post,posts});
			} else {
				this.setState({posts});
			}
		})
	}

	onChangeSelectPost(value){
		const selectValue = parseInt(value);
		const post = this.state.posts.find((item)=> {return item.id == selectValue});
		this.setState({selectedPost: selectValue, post})
		this.props.setAttributes({
			selectedPost: selectValue,
			title: post.title.rendered,
			content: post.excerpt.rendered,
			link: post.link,
		});
	}

	render() {
		let options = [
			{
				value: 0,
				label: __('Select a Post')
			}
		];
		let output = __('Loading Posts');
		this.props.className += ' loading';
		if (this.state.posts.length > 0){
			const loading = __('We have %d posts. Choose one.');
			output = loading.replace('%d', this.state.posts.length);
			this.state.posts.forEach((post)=>{
				options.push({value: post.id, label:post.title.rendered});
			});
		} else {
			output = __( 'No posts found. Please create some first.' );
		}
		if (this.state.post.title){
			output = <div className="post">
				<a href={this.state.post.link}>
					<h2 dangerouslySetInnerHTML={{__html: this.state.post.title.rendered}}></h2>
				</a>
				<p dangerouslySetInnerHTML={{__html: this.state.post.excerpt.rendered}}></p>
			</div>;
			this.props.className += ' has-post';
		} else {
			this.props.className += ' no-post';
		}
		return (
			<div>
				{!!this.props.isSelected && (
					<InspectorControls key="inspector">
						<SelectControl
							onChange={this.onChangeSelectPost}
							value={this.props.attributes.selectedPost}
							label={__('Select a Post')}
							options={options}
						/>
					</InspectorControls>
				)}
				<div className={this.props.className}>{output}</div>
				{/*<div{ ...useBlockProps() }>{output}</div>*/}
			</div>
		)
	}
}

registerBlockType(postBlockMetadata, {
	edit: povluSelectPosts,
	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="post">
					<a href={ props.attributes.link }><h2 dangerouslySetInnerHTML={ { __html: props.attributes.title } }></h2></a>
					<p dangerouslySetInnerHTML={ { __html: props.attributes.content } }></p>
				</div>
			</div>
		);
	},
});
