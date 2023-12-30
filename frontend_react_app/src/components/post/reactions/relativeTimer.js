export function timeAgo(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        if (interval > 1) {
            return `${interval} years ago`;
        } else {
            return `${interval} year ago`;
        }
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        if (interval > 1) {
            return `${interval} months ago`;
        } else {
            return `${interval} month ago`;
        }
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        if (interval > 1) {
            return `${interval} days ago`;
        } else {
            return `${interval} day ago`;
        }
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        if (interval > 1) {
            return `${interval} hours ago`;
        } else {
            return `${interval} hour ago`;
        }
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        if (interval > 1) {
            return `${interval} minutes ago`;
        } else {
            return `${interval} minute ago`;
        }
    }

    if (seconds < 30) {
        return 'just now';
    }
    return `${Math.floor(seconds)} seconds ago`;
}



