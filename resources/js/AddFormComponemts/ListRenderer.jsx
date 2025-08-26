export const ListRenderer = ({ htmlContent }) => {
    // Basic sanitization (optional - use DOMPurify for better security)
    const sanitizedHtml = htmlContent
        .replace(/<script.*?>.*?<\/script>/gi, "") // Remove script tags
        .replace(/<style.*?>.*?<\/style>/gi, ""); // Remove style tags

    return (
        <div className="custom-list-container">
            <div
                dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
                className="custom-list-content"
            />
            <style>
                {`
      .custom-list-content ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin: 1rem 0;
  line-height: 1.6;
}

.custom-list-content ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin: 1rem 0;
  line-height: 1.6;
}

.custom-list-content li {
  margin-bottom: 0.5rem;
}`}
            </style>
        </div>
    );
};
