import firebase from 'firebase';
import uuid from 'uuid';

export function addArticle({ file, content, userId, userDisplayName, userProfileUrl }) {

    const filename = uuid.v1();
    const extension = file.name.split('.').pop();
    const url = `article/${filename}.${extension}`;

    const articleRef = firebase.storage().ref().child(url);
    //promise 리턴 해줘야함 : 외부에서 써야 하기 때문에
    return articleRef.put(file)
        .then((snapshot) => {
            return snapshot.ref.getDownloadURL();
        })
        .then((downloadUrl) => {
            const articleId = uuid.v1();
            return firebase.firestore().collection('articles').doc(articleId).set({
                id: articleId,
                downloadUrl,
                content,
                userId,
                userDisplayName,
                userProfileUrl,
                likeCnt: 0,
                commentCnt: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        })
}

export function getArticleList(lastItem, count) {
    const limitCount = count || 30;

    if (lastItem) {
        return firebase.firestore().collection('articles')
            .orderBy("createdAt", "desc")
            .startAfter(lastItem)
            .limit(limitCount)
            .get();
    } else {
        return firebase.firestore().collection('articles')
            .orderBy("createdAt", "desc")
            .limit(limitCount)
            .get();
    }

}


export function getArticle(articleId) {
    return firebase.firestore().collection('articles').doc(articleId).get();
}

export function getCommentList(articleId, lastItem, count) {
    const limitCount = count || 30;

    if (lastItem) {
        return firebase.firestore().collection('comments')
            .where("articleId", "==", articleId)
            .orderBy("createdAt", "desc")
            //startAfter =>doc형태가 인자로 들어가야 함
            .startAfter(lastItem)
            .limit(limitCount)
            .get();
    } else {
        return firebase.firestore().collection('comments')
            .where("articleId", "==", articleId)
            .orderBy("createdAt", "desc")
            .limit(limitCount)
            .get();
    }

}

export function addComment({ userId, userDisplayName, userProfileUrl, content, articleId }) {

    const commentId = uuid.v1();
    return firebase.firestore().collection('comments').doc(commentId).set({
        id: commentId,
        userId,
        articleId,
        userDisplayName,
        userProfileUrl,
        content,
        createdAt: new Date(),
        updatedAt: new Date(),
        displayTimestamp: new Date().toISOString().substring(0, 10)
    }).then(() => {
        return firebase.firestore().collection('articles').doc(articleId).get();
    }).then((articleDoc) => {
        const curCommentCnt = articleDoc.data().commentCnt;
        return firebase.firestore().collection('articles').doc(articleId).set({
            commentCnt: curCommentCnt + 1,
        }, { merge: true })
    }).then(() => {
        return firebase.firestore().collection('comments').doc(commentId).get();
    });
}

export function deleteArticle(articleId) {
    return firebase.firestore().collection('articles').doc(articleId).delete();
}

export function deleteComment(commentId) {
    return firebase.firestore().collection('comments').doc(commentId).delete();
}


export function getComment(commentId) {
    return firebase.firestore().collection('comments').doc(commentId).get();
}