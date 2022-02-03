import {__} from "@wordpress/i18n";
import {useState, useEffect} from "@wordpress/element";
import {registerBlockType} from "@wordpress/blocks";
import {SelectControl} from '@wordpress/components';
import {InspectorControls} from "@wordpress/block-editor";
import apiFetch from '@wordpress/api-fetch';

const PovlySelectPosts = (props) => {
    let [posts, setPosts] = useState([]);
    let [selectedPost, setSelectedPost] = useState(0);
    let [post, setPost] = useState({});

    useEffect(()=>{
        getOptions();
    }, []);

    function getOptions(){
        setSelectedPost(props.attributes.selectedPost);
        apiFetch({path: '/wp/v2/posts'}).then((items)=>{
            if (items && selectedPost !== 0 ){
                let post = items.find((item)=> {return item.id === selectedPost});
                setPost(post);
                setPosts(items);
            } else {
                console.log(items);
                setPosts(items);
            }
        })
    }

    let options  = [
        {value: 0, label: 'Select a post'}
    ];

    const onChangeSelectPost = (value) => {
        let post = posts.find((post)=>{
            return post.id == value;
        });
        if (post){
            setSelectedPost(value);
            setPost(post);
            props.setAttributes({
                selectedPost: post.id,
                title: post.title.rendered,
                content: post.content.rendered,
                link: post.link
            });
        } else {
            setSelectedPost(0);
            setPost({});
            props.setAttributes({
                selectedPost: 0,
                title: '',
                content: [],
                link: ''
            });
        }
    }

    let output = __('Loading Posts');

    if (posts.length > 0){
        let loading = __('We have %d posts. Choose one.');
        output = loading.replace('%d', posts.length);
        posts.forEach((post)=>{
           options.push({value: post.id, label: post.title.rendered});
        });
    }

    if (Object.getOwnPropertyNames(post).length !== 0 ){
        output = <div className="post">
            <a href={post.link}>
                <h2 dangerouslySetInnerHTML={{__html: post.title.rendered}}></h2>
            </a>
            <p dangerouslySetInnerHTML={{__html: post.content.rendered}}></p>
        </div>;
    }

    return (
        <div>
            <InspectorControls key="inspector">
                <SelectControl
                    onChange={onChangeSelectPost}
                    value={props.attributes.selectedPost}
                    label={__('Select a Post')}
                    options={options}
                />
            </InspectorControls>
            <div className={props.className}>{output}</div>
        </div>
    )
};


export default PovlySelectPosts;