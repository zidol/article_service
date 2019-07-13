import React,{Component} from 'react';
import {Form, Button, Message} from 'semantic-ui-react';
import styled from 'styled-components';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as articleActions from '../../module/article/actions';

const InvisibleUploadButton = styled.input`
    display:none;
`
const Preview = styled.div`
    height: 300px;
    border-radius : 5px;
    background-image : url(${props => props.src});
    background-repeat: no-repeat;
    background-position: center center;
    &:hover{
        cursor : pointer;
    }
`

class AddArticle extends Component {
    state = {
        images: [],
        content : "",
    }
    onImageChange = e => {
        //인덱스가 없으면 에러나기때문에 방ㅇㅓ적으로 작성
        if(!(e.target.files && e.target.files.length)){
            return;
        }
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => 
        {
            this.setState({
                images : [
                    {
                        file:file,
                        src: reader.result
                    },
                    ...this.state.images
                ]
            },
            //두번쩨  이미지 올리기 위한 초기화 작업
            () => {
                this.refs.image.value ="";
            });
        };
    };

    onAddImage = e=> {
        this.refs.image.click();
    }

    onHandleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onAddArticle = e => {
        const {images, content} = this.state;
        if(!images.length) {
            this.props.articleActions.addArticleFailed(new Error('Image required'));
            return;
        }
        const files = images.map(image => image.file);
        this.props.articleActions.addArticle({files, content});
    }

    onDeleteImage = index => {
        this.setState({
            images: this.state.images.filter((item, i) => i !== index)
        });
    }
    render () {
        const {images, content} = this.state;
        const {error, isLoading} = this.props;

        const list = images.map((image, index) => {
            return (
                <Preview 
                    key={index}
                    src = {image.src}
                    onClick={() => {
                        this.onDeleteImage(index);
                    }}
                />
            )
        })
        return (
            <Form>
                <InvisibleUploadButton ref="image" type="file" onChange={this.onImageChange}/>
                <Button fluid onClick={this.onAddImage}>이미지 추가</Button>
                {list} 
                <Form.TextArea name="content" value={content} onChange={this.onHandleChange}/>
                <Button fluid loading={isLoading} onClick={this.onAddArticle}>게시글 추가</Button>
                {error && error.message ? <Message> {error.message} </Message> : null}
            </Form>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        isLoading : state.article.addArticle.isLoading,
        error: state.article.addArticle.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        articleActions : bindActionCreators(articleActions, dispatch),
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(AddArticle);