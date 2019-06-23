import React,{Component} from 'react';
import {Form, Button, Icon} from 'semantic-ui-react';
import styled from 'styled-components';

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
        image: null,
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

        reader.onload = () => {
            this.setState({
                image: {
                    file:file,
                    src: reader.result
                }
            })
        }
    }

    onAddImage = e=> {
        this.refs.image.click();
    }

    onHandleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onAddArticle = e => {
        const {image, content} = this.state;
        if(!image) {
            return;
        }

        // 게시글 추가
    }

    onDeleteImage = e => {
        this.refs.image.value = '';
        this.setState({
            image: null
        })
    }
    render () {
        const {image, content} = this.state;
        return (
            <Form>
                <InvisibleUploadButton ref="image" type="file" onChange={this.onImageChange}/>
                <Button fluid onClick={this.onAddImage}>이미지 추가</Button>
                {image && image.src? <Preview src={image.src} onClick={this.onDeleteImage}/>: null} 
                <Form.TextArea name="content" value={content} onChange={this.onHandleChange}/>
                <Button fluid onClick={this.onAddArticle}>게시글 추가</Button>
            </Form>
        )
    }
}

export default AddArticle;