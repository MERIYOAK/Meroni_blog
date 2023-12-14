import All_posts from "../all_posts/All_posts";

let renderedComponent;

if (posts && posts.length > 0) {
    const firstPostTableName = posts[0].tableName;

    switch (firstPostTableName) {
        case 'my_journey_post':
        case 'finance_post':
        case 'philosophy_post':
        case 'science_post':
        case 'technology_post':
        case 'art_post':
        case 'politics_post':
            renderedComponent = <All_posts posts={posts} />;
            break;
        case 'philosophy_article_post':
        case 'science_article_post':
            renderedComponent = <FinanceComponent posts={posts} />;
            break;
        // Add cases for other tableNames and their respective components
        default:
            renderedComponent = null; // Default to null or handle unknown tableNames
            break;
    }
}

return renderedComponent;
