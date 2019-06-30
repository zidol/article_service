import React, { Component } from 'react';
import CommentItem from './CommentItem';
import {Button, Form} from 'semantic-ui-react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as articleActions from '../../module/article/actions';

class CommentList extends Component {
    
    state = {
        content : '',
    }
    
    static defaultProps = {
        list: [],
    }

    componentDidMount() {
        //댓글리스트
        if(this.props.id) {
            this.props.articleActions.getCommentList(
                this.props.id,
                null,
                2
            )
        }
    }

    onHandleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onLoadMore = e => {
        if(this.props.id) {
            const lastItem = this.props.list.length ? this.props.list[this.props.list.length - 1] : null;
            this.props.articleActions.getCommentList(
                this.props.id,
                lastItem,
                2
            )
        }
    }

    onAddComment = e => {
        const articleId = this.props.id;
        const {content} = this.state;
        if(!content){
            return;
        }
        this.props.articleActions.addComment({
            articleId,
            content,
        })
    }
    render() {

        const{content} = this.state;
        const { list, isLoading, isAddCommentLoading } = this.props;
        const listView = list.map((doc) => {
            const item = doc.data();
            return <CommentItem
                key={item.id}
                id={item.id}
                articleId = {item.articleId}
                userId={item.userId}
                content={item.content}
                datetime={item.displayTimestamp}
                name={item.userDisplayName}
                imageUrl={item.userProfileUrl}
            />
        })

        return (
            <div>
                <Form>
                    <Form.TextArea name="content" value={content} onChange={this.onHandleChange}></Form.TextArea>
                    <Button loading={isAddCommentLoading} onClick={this.onAddComment}>댓글 추가</Button>
                </Form>
                {listView}
                <Button onClick={this.onLoadMore} loading={isLoading}>댓글 더 불러오기</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        list : state.article.getCommentList.list,
        isLoading : state.article.getCommentList.isLoading,
        isAddCommentLoading : state.article.addComment.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        articleActions : bindActionCreators(articleActions, dispatch),
    }
}
export default  connect(mapStateToProps,mapDispatchToProps)(CommentList);