import {__} from "@wordpress/i18n";
import {useState, useEffect} from "@wordpress/element";
import {registerBlockType} from "@wordpress/blocks";
import {SelectControl} from '@wordpress/components';
import {InspectorControls} from "@wordpress/block-editor";
import apiFetch from '@wordpress/api-fetch';

const PovlySelectPosts = (props) => {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(0);
    const [post, setPost] = useState({});

    useEffect(()=>{
        getOptions();
    }, [])

    const getOptions = ()=>{
        return apiFetch({path: '/wp/v2/posts'}).then((data)=> {
            if (data && 0 != selectedPost){
                const post = data.find((item)=>{return item.id == selectedPost});
                setPost(post);
                setPosts(data);
            } else {
                setPosts(data);
            }
        })
    }

    const onChangeSelectPost = (value) =>{
        const selectValue = parseInt(value);
        const post = posts.find((item)=> {return item.id == selectValue});
        if (post){
            setSelectedPost(selectValue);
            setPost(post);
            props.setAttributes({
                selectedPost: selectValue,
                title: post.title.rendered,
                content: post.excerpt.rendered,
                link: post.link,
            });
        } else {
            setSelectedPost(selectValue);
            setPost({});
            props.setAttributes({
                selectedPost: 0,
                title: '',
                content: [],
                link: '',
            });
        }
    }

    let options = [
        {
            value: 0,
            label: __('Select a Post')
        }
    ];
    let output = __('Loading Posts');
    props.className += ' loading';
    if (posts.length > 0){
        const loading = __('We have %d posts. Choose one.');
        output = loading.replace('%d', posts.length);
        posts.forEach((post)=>{
            options.push({value: post.id, label:post.title.rendered});
        });
    } else {
        output = __( 'No posts found. Please create some first.' );
    }
    if (post.hasOwnProperty('title')){
        output = <div className="post">
            <a href={post.link}>
                <h2 dangerouslySetInnerHTML={{__html: post.title.rendered}}></h2>
            </a>
            <p dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}></p>
        </div>;
    }
    return (
        <div>
            {!!props.isSelected && (
                <InspectorControls key="inspector">
                    <SelectControl
                        onChange={onChangeSelectPost}
                        value={props.attributes.selectedPost}
                        label={__('Select a Post')}
                        options={options}
                    />
                </InspectorControls>
            )}
            <div className={props.className}>{output}</div>
        </div>
    )
};


export default PovlySelectPosts;