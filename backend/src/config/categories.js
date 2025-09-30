export const VOTE_CATEGORIES = {
    'front-back': {
        name: 'Front-End vs Back-End',
        options: ['frontend', 'backend'],
        route: '/frontBack'
    },
    'js-ts': {
        name: 'JavaScript vs TypeScript',
        options: ['javascript', 'typescript'],
        route: '/jsTs'
    },
    'sql-nosql': {
        name: 'SQL vs NoSQL',
        options: ['sql', 'nosql'],
        route: '/sqlNosql'
    },
    'github-gitlab': {
        name: 'GitHub vs GitLab',
        options: ['github', 'gitlab'],
        route: '/githubGitlab'
    },
    'windows-linux-mac': {
        name: 'Windows vs Linux vs macOS',
        options: ['windows', 'linux', 'macos'],
        route: '/windowsLinuxMac'
    }
};

export const getAllCategories = () => {
    return Object.keys(VOTE_CATEGORIES);
};

export const getCategoryInfo = (category) => {
    return VOTE_CATEGORIES[category] || null;
};

export const isValidCategory = (category) => {
    return category in VOTE_CATEGORIES;
};

export const isValidOptionForCategory = (category, option) => {
    const categoryInfo = getCategoryInfo(category);
    return categoryInfo && categoryInfo.options.includes(option);
};