// Shows error message

export default function showErrorMessage(error) {
  const errorHtml = `<div class="error"> 
    <p>There was an error while loading this page.</p>
    <p>
    Error type: ${error}.
    </p>
    </div>
    `;
  return errorHtml;
}
