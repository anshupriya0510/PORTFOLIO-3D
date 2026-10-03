import { NextResponse } from 'next/server';

export async function GET() {
  const username = 'anshupriya0510';

  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, {
        headers: { Accept: 'application/vnd.github.v3+json' },
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) {
      return NextResponse.json({ error: 'GitHub API error' }, { status: userRes.status });
    }

    const [user, repos] = await Promise.all([userRes.json(), reposRes.json()]);

    return NextResponse.json({
      name: user.name || user.login,
      username: user.login,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      avatar_url: user.avatar_url,
      repos: repos.map((r: {name: string; description: string; html_url: string; stargazers_count: number; language: string; topics: string[]}) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        language: r.language,
        topics: r.topics,
      }))
    });
  } catch (error) {
    console.error('[GitHub API Error]', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub data' }, { status: 500 });
  }
}
