function sanitizeHTML(str) {
    if (!str) return '';
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
    }
    
    document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const detailsDiv = document.getElementById('confirmation-details');
    
    if (!detailsDiv) return;
    
    let output = '<table>';
    
    const requiredFields = {
    'fname': 'First Name',
    'lname': 'Last Name',
    'email': 'Email',
    'phone': 'Mobile Phone',
    'orgname': 'Organization Name',
    'timestamp': 'Submission Timestamp'
    };
    
    for (const [key, label] of Object.entries(requiredFields)) {
    const value = params.get(key);
    
    if (key === 'timestamp' && value) {
    const date = new Date(parseInt(value));
    output += `
    <tr>
    <td><strong>${label}:</strong></td>
    <td>${date.toLocaleString('en-US')}</td>
    </tr>
    `;
    } else if (value) {
    output += `
    <tr>
    <td><strong>${label}:</strong></td>
    <td>${sanitizeHTML(value)}</td>
    </tr>
    `;
    }
    }
    
    output += '</table>';
    
    if (params.toString()) {
    detailsDiv.innerHTML = output;
    } else {
    detailsDiv.innerHTML = '<p>No form information found.</p>';
     }
    });  
