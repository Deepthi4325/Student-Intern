import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Eye,
  Send,
  Sparkles,
  Share2,
  Filter,
  User,
  PlusCircle,
  CheckCircle2,
  Tag,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CommunityPost } from '../../types';

export const Community: React.FC = () => {
  const { communityPosts, upvotePost, addComment, createPost, user } = useApp();

  const [activeTab, setActiveTab] = useState<'Feed' | 'Interview Experience' | 'Success Stories' | 'My Drops'>('Feed');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState<CommunityPost['category']>('Interview Experience');
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Active expanded comments
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({
    'post-1': true,
  });
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});

  const tabs: ('Feed' | 'Interview Experience' | 'Success Stories' | 'My Drops')[] = [
    'Feed',
    'Interview Experience',
    'Success Stories',
    'My Drops',
  ];

  const filteredPosts = communityPosts.filter((post) => {
    if (activeTab === 'Feed') return true;
    return post.category === activeTab;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;
    createPost(postTitle, postContent, postCategory);
    setPostTitle('');
    setPostContent('');
    setIsComposerOpen(false);
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    addComment(postId, text);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
  };

  const toggleComments = (postId: string) => {
    setExpandedComments((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Community & Interview Experiences
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Real interview debriefs, placement success stories, and verified student cheatsheets.
          </p>
        </div>

        <button
          onClick={() => setIsComposerOpen(!isComposerOpen)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-indigo-700 transition-colors self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4" />
          <span>{isComposerOpen ? 'Close Composer' : 'Create Post / Share Drop'}</span>
        </button>
      </div>

      {/* Post Composer Accordion */}
      {isComposerOpen && (
        <form onSubmit={handleCreatePost} className="rounded-2xl border border-indigo-200 bg-white p-6 shadow-md space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-bold text-slate-900">
              Share With 40,000+ Students
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-500 font-medium">Category:</label>
              <select
                value={postCategory}
                onChange={(e) => setPostCategory(e.target.value as any)}
                className="rounded-lg border border-slate-300 py-1 px-2 text-xs text-slate-800 focus:border-indigo-500 focus:outline-none"
              >
                <option value="Interview Experience">Interview Experience</option>
                <option value="Success Stories">Success Stories</option>
                <option value="My Drops">My Drops (Cheatsheet / Notes)</option>
                <option value="Prep Doubts">Prep Doubts</option>
              </select>
            </div>
          </div>

          <div>
            <input
              type="text"
              placeholder="Title: e.g. How I Cracked Microsoft SDE-1 Off-Campus (Round-by-Round Breakdown)"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-2.5 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none font-medium"
            />
          </div>

          <div>
            <textarea
              rows={4}
              placeholder="What happened in your interview? What specific patterns or sliding window questions did they ask? What would you do differently?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              className="w-full rounded-lg border border-slate-300 p-3 text-xs text-slate-900 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsComposerOpen(false)}
              className="rounded-lg px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-indigo-700"
            >
              Publish Post
            </button>
          </div>
        </form>
      )}

      {/* Filterable Tabs */}
      <div className="flex items-center gap-1.5 border-b border-slate-200 pb-1 overflow-x-auto text-xs font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`whitespace-nowrap rounded-lg px-4 py-2 transition-all ${
              activeTab === tab
                ? 'bg-indigo-50 text-indigo-700 font-bold border-b-2 border-indigo-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {filteredPosts.map((post) => {
          const areCommentsOpen = Boolean(expandedComments[post.id]);
          return (
            <div
              key={post.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-slate-300 transition-all space-y-4"
            >
              {/* Post Author Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    referrerPolicy="no-referrer"
                    className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span>{post.author.name}</span>
                      <span className="rounded bg-indigo-50 px-1.5 py-0.2 text-[10px] font-semibold text-indigo-700">
                        {post.category}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {post.author.role} · {post.author.companyOrCollege} · {post.postedAt}
                    </div>
                  </div>
                </div>
              </div>

              {/* Post Title & Content */}
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-snug">
                  {post.title}
                </h2>
                <p className="mt-2 text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Metrics & Action Bar */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => upvotePost(post.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 transition-colors ${
                      post.isUpvoted
                        ? 'bg-indigo-50 text-indigo-700 font-bold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    <ThumbsUp className={`h-4 w-4 ${post.isUpvoted ? 'fill-indigo-600' : ''}`} />
                    <span className="font-mono tabular-nums">{post.upvotes}</span>
                  </button>

                  <button
                    onClick={() => toggleComments(post.id)}
                    className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span className="font-mono tabular-nums">{post.commentsCount} comments</span>
                  </button>

                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-slate-400">
                    <Eye className="h-3.5 w-3.5" />
                    <span className="font-mono tabular-nums">{post.views} views</span>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              {areCommentsOpen && (
                <div className="pt-3 border-t border-slate-100 space-y-3">
                  {/* Comment Input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add to the discussion or ask a specific question..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) =>
                        setCommentInputs({ ...commentInputs, [post.id]: e.target.value })
                      }
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleAddComment(post.id);
                      }}
                      className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 focus:border-indigo-500 focus:bg-white focus:outline-none"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Comments List */}
                  {post.comments && post.comments.length > 0 && (
                    <div className="space-y-2 pt-1">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="rounded-xl bg-slate-50 p-3 text-xs">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-900">{comment.author}</span>
                            <span className="text-[10px] text-slate-400">{comment.timeAgo}</span>
                          </div>
                          <p className="text-slate-700 leading-relaxed">{comment.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
