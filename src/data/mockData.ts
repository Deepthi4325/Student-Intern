import {
  UserProfile,
  TopicContent,
  PrephubSheet,
  OpportunityItem,
  CommunityPost,
  CourseItem,
  AssignmentItem,
  CertificateItem,
  NotificationItem,
} from '../types';

export const initialUserProfile: UserProfile = {
  name: 'Alex Chen',
  email: 'alex.chen@university.edu',
  avatar: '/src/assets/images/avatar_student_user_1790427225054.jpg',
  level: 'Intermediate',
  targetRole: 'Software Development Engineer (SDE-1)',
  targetCompanyTier: 'FAANG/Tier-1',
  weeklyHoursGoal: 15,
  streakDays: 14,
  xp: 1420,
  improvementRate: 28,
  lessonsCompleted: 42,
  coursesInProgress: 3,
  preferredFormat: 'interactive',
  isOnboarded: true,
  theme: 'light',
};

export const sampleTopics: TopicContent[] = [
  {
    id: 'topic-sliding-window',
    title: 'Sliding Window & Two Pointers (Dynamic Substrings)',
    subject: 'Data Structures & Algorithms',
    sheetName: 'Sheet 02 · Two Pointers & Sliding Window',
    difficulty: 'Medium',
    estimatedMinutes: 25,
    tags: ['DSA', 'Arrays', 'Strings', 'LeetCode-Pattern', 'FAANG-Frequent'],
    levelFraming: {
      Beginner: {
        summary: 'Think of the sliding window like an elastic rubber band or an inspection frame moving across words. Instead of checking every pair from scratch, you expand one end and shrink the other as needed.',
        focusTip: 'Start with fixed-size windows first before tackling dynamic windows where the condition determines when the left pointer shrinks.',
      },
      Intermediate: {
        summary: 'Dynamic sliding window maintains a monotonic condition over a contiguous subarray in O(N) amortized time by advancing right and shrinking left to restore invariant states.',
        focusTip: 'Watch out for frequency hashmap counts and zero-frequency cleanup: remember that decrementing a character count is not the same as deleting the key.',
      },
      Advanced: {
        summary: 'Sliding window invariant mechanics mapped to streaming data and kernel memory ring buffers. Optimal space reduction uses integer ASCII arrays over hash tables for L1 cache friendliness.',
        focusTip: 'In production low-latency engines, replace dynamic hash maps with uint16 fixed frequency arrays (size 128 or 256) to prevent GC pressure and pointer-chasing latency.',
      },
    },
    textNotes: {
      introduction:
        'The Sliding Window technique is one of the most critical algorithmic paradigms for string and array interview questions. It avoids nested brute-force loops (O(N²)) by maintaining a running window invariant in linear O(N) time.',
      keyConcepts: [
        {
          title: 'The Window Invariant',
          description:
            'A valid window [L, R] satisfies a specific rule (e.g., at most K distinct characters, no duplicates, or sum <= target). As R expands, if the invariant breaks, L advances until validity is restored.',
        },
        {
          title: 'Amortized O(N) Proof',
          description:
            'Even though there is a nested while loop inside the for loop, pointer L and pointer R each traverse the array at most once from 0 to N. Total pointer movements <= 2N, guaranteeing O(N) amortized runtime.',
        },
        {
          title: 'Fixed vs. Dynamic Windows',
          description:
            'Fixed windows maintain (R - L + 1 == K), while dynamic windows grow greedily until invalid, then contract conditionally to find either min or max length.',
        },
      ],
      codeSnippet: {
        language: 'typescript',
        code: `// Longest Substring Without Repeating Characters (LeetCode #3)
function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    
    // If char was seen within current window, shift left
    if (lastSeen.has(char) && lastSeen.get(char)! >= left) {
      left = lastSeen.get(char)! + 1;
    }

    lastSeen.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
        complexity: {
          time: 'O(N) single pass',
          space: 'O(min(N, M)) where M is character alphabet size',
        },
      },
      edgeCases: [
        'Empty string `""` -> returns 0',
        'String with identical characters `"bbbbbb"` -> window length never exceeds 1',
        'String with all distinct characters `"abcdef"` -> window length equals length of string',
        'Unicode characters and space delimiters included in input',
      ],
    },
    videoData: {
      title: 'Mastering the Sliding Window Pattern in 10 Minutes',
      duration: '11:42',
      instructor: 'Priya Sharma (Ex-Google L5 Tech Lead)',
      timestamps: [
        { time: '00:00', label: 'The Core Intuition & Why O(N²) Fails' },
        { time: '02:30', label: 'Two Pointers Setup & Pointer Invariant' },
        { time: '05:15', label: 'Hash Map vs Array Lookup Benchmark' },
        { time: '08:10', label: 'Handling Edge Cases in Live Coding' },
        { time: '10:20', label: 'Interview Checklist & Variations' },
      ],
      summary:
        'A concise walkthrough deconstructing how top candidates identify window expansion and contraction conditions in under 2 minutes.',
    },
    audioData: {
      title: 'PrepCast Audio Byte · The Sliding Window Mental Model',
      duration: '06:18',
      audioByteName: 'Episode 14: Mental Frames for Two Pointers',
      transcriptSummary: [
        'Welcome to PrepCast. Imagine a spotlight sliding over a film reel.',
        'When an interviewer asks for "longest contiguous substring" or "minimum window containing all elements", your brain should immediately test the sliding window pattern.',
        'Always ask: When I add element at R, does my window become invalid? If yes, how do I shrink L to make it valid again?',
        'Never jump straight into coding without stating the window invariant out loud.',
      ],
    },
    diagramData: {
      type: 'array-pointers',
      steps: [
        {
          stepNumber: 1,
          title: 'Initialize pointers at index 0',
          description: 'Both Left (L) and Right (R) point to index 0. Current window: "p", len = 1.',
          activeNodeId: 'node-0',
        },
        {
          stepNumber: 2,
          title: 'Expand Right pointer to index 1',
          description: 'R moves to "w". No duplicates in window ["p", "w"]. Max length updated to 2.',
          activeNodeId: 'node-1',
        },
        {
          stepNumber: 3,
          title: 'Expand Right pointer to index 2',
          description: 'R points to "w" again! Duplicate detected. Invariant broken.',
          activeNodeId: 'node-2',
        },
        {
          stepNumber: 4,
          title: 'Shrink Left pointer past previous occurrence',
          description: 'L shifts to index 2. Window is now just "w". Validity restored!',
          activeNodeId: 'node-2-resolved',
        },
      ],
      nodes: [
        { id: 'node-0', label: 'p [0]', subtext: 'L=0, R=0', status: 'highlight' },
        { id: 'node-1', label: 'w [1]', subtext: 'R=1', status: 'active' },
        { id: 'node-2', label: 'w [2]', subtext: 'Duplicate!', status: 'passive' },
        { id: 'node-3', label: 'k [3]', subtext: 'Next', status: 'passive' },
        { id: 'node-4', label: 'e [4]', subtext: 'Next', status: 'passive' },
        { id: 'node-5', label: 'w [5]', subtext: 'Next', status: 'passive' },
      ],
    },
    comicData: {
      title: 'The Café Window & The Greedy Inspection Frame',
      themeStory: 'How two pointers save the barista from re-checking every drink ticket from zero',
      panels: [
        {
          panelNumber: 1,
          character: 'Chief Barista Lin',
          dialogue: '"We need the longest sequence of drinks without repeating any customer name!"',
          narrative: 'Lin places an adjustable acrylic frame over the incoming ticket line.',
        },
        {
          panelNumber: 2,
          character: 'Apprentice Bot',
          dialogue: '"Should I check all possible ticket pairs? That is N-squared combinations, Chief!"',
          narrative: 'Bot starts calculating 10,000 combinations while the coffee turns cold.',
        },
        {
          panelNumber: 3,
          character: 'Chief Barista Lin',
          dialogue: '"No! Keep the right edge expanding. If you see a duplicate, gently nudge the left edge forward!"',
          narrative: 'The frame effortlessly glides forward. Zero redundant work, pure O(N) elegance.',
        },
        {
          panelNumber: 4,
          character: 'Apprentice Bot',
          dialogue: '"Aha! Each ticket is looked at only when it enters and exits the frame! O(2N) total!"',
          narrative: 'The café runs at lightning speed and customer orders are delivered in record time.',
        },
      ],
    },
    interactiveData: {
      title: 'Live Sliding Window Simulator',
      description: 'Step through an array of numbers to find the longest subarray where sum <= 14.',
      initialArray: [2, 5, 1, 7, 4, 3, 8],
      targetValue: 14,
    },
    flashcards: [
      {
        id: 'fc-1',
        question: 'What is the key condition that makes an array problem solvable with Sliding Window?',
        answer: 'Contiguous subarray property + Monotonicity',
        explanation:
          'The problem must require contiguous elements, and expanding the window must predictably advance or maintain the problem condition.',
        tip: 'If elements can be picked non-contiguously, think Dynamic Programming, Greedy, or Hash Sets instead.',
      },
      {
        id: 'fc-2',
        question: 'Why is a sliding window with a nested while loop still O(N) runtime?',
        answer: 'Each pointer moves at most N steps in one direction without backtracking.',
        explanation:
          'Left and Right pointers together execute at most 2 * N iterations total over the lifetime of the algorithm.',
        tip: 'In interviews, emphasize the term "Amortized O(N)" to score high communication marks.',
      },
      {
        id: 'fc-3',
        question: 'How do you optimize character lookup space from O(N) to O(1) in ASCII problems?',
        answer: 'Use a fixed-size integer array of length 128 or 256 instead of an object/map.',
        explanation:
          'Direct array indexing `arr[char.charCodeAt(0)]` eliminates hash collision checks and garbage collection overhead.',
      },
    ],
    quiz: [
      {
        id: 'q-1',
        question: 'In the "Longest Substring Without Repeating Characters" problem, what is the best worst-case time complexity achievable?',
        options: ['O(N²)', 'O(N log N)', 'O(N)', 'O(2^N)'],
        correctIndex: 2,
        explanation: 'Using two pointers with an index hash map or ASCII frequency array yields O(N) single-pass runtime.',
      },
      {
        id: 'q-2',
        question: 'When the window invariant is violated, which pointer MUST be updated?',
        options: [
          'The Right pointer must jump back to zero',
          'The Left pointer moves forward until invariant is restored',
          'Both pointers swap positions',
          'The array must be re-sorted in ascending order',
        ],
        correctIndex: 1,
        explanation: 'We contract the window by incrementing the Left pointer to drop older elements until validity returns.',
      },
      {
        id: 'q-3',
        question: 'What happens if we re-sort an array before applying the classic sliding window for contiguous subarrays?',
        options: [
          'It speeds up the solution to O(log N)',
          'It destroys the contiguous order of the original elements, rendering the result invalid',
          'It has no effect on subarray indices',
          'It is required for two pointers to function',
        ],
        correctIndex: 1,
        explanation: 'Sorting scrambles the contiguous index relationships of the original sequence.',
      },
    ],
  },
  {
    id: 'topic-distributed-caching',
    title: 'Distributed Caching & Eviction Policies (LRU vs LFU)',
    subject: 'System Design',
    sheetName: 'Sheet 01 · High-Level System Architecture',
    difficulty: 'Hard',
    estimatedMinutes: 30,
    tags: ['System Design', 'Redis', 'Caching', 'Scalability', 'Backend'],
    levelFraming: {
      Beginner: {
        summary: 'A cache is like keeping your favourite notebook on your desk instead of walking to the university library archive each time you need a fact.',
        focusTip: 'Understand cache hit vs cache miss before diving into multi-node replication.',
      },
      Intermediate: {
        summary: 'Distributed caching handles high read throughput by holding hot data in memory, relying on consistent hashing and eviction strategies (LRU, LFU, FIFO).',
        focusTip: 'Be prepared to design Cache-Aside vs Write-Through vs Write-Back strategies in system design interviews.',
      },
      Advanced: {
        summary: 'Deep architectural tradeoffs: cache stampede mitigation (mutex locks / probabilistic early expiration), Redis Cluster slot distribution, and thundering herd solutions.',
        focusTip: 'Discuss cross-DC replication lag, memcached vs redis single-threaded event loop, and memory fragmentation with jemalloc.',
      },
    },
    textNotes: {
      introduction:
        'Caches sit between clients and persistent storage to slash read latencies from milliseconds (disk/network) to sub-millisecond RAM lookups.',
      keyConcepts: [
        {
          title: 'Eviction Strategies: LRU vs LFU',
          description:
            'LRU (Least Recently Used) discards items that have not been read for the longest time using a Hash Map + Doubly Linked List in O(1). LFU (Least Frequently Used) tracks access counts.',
        },
        {
          title: 'Caching Patterns',
          description:
            'Cache-Aside (lazy loading), Write-Through (writes update cache and DB simultaneously), and Write-Behind/Write-Back (writes to cache immediately, asynchronous batch write to DB).',
        },
        {
          title: 'Cache Stampede & Thundering Herd',
          description:
            'When a hot key expires, thousands of simultaneous requests miss the cache and overwhelm the database. Mitigate via distributed locks or probabilistic early renewal (XFetch).',
        },
      ],
      codeSnippet: {
        language: 'typescript',
        code: `// LRU Cache with O(1) get and put
class LRUNode {
  key: number;
  val: number;
  prev: LRUNode | null = null;
  next: LRUNode | null = null;
  constructor(k: number, v: number) { this.key = k; this.val = v; }
}

class LRUCache {
  private capacity: number;
  private map = new Map<number, LRUNode>();
  private head = new LRUNode(0, 0);
  private tail = new LRUNode(0, 0);

  constructor(cap: number) {
    this.capacity = cap;
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key)!;
    this.moveToHead(node);
    return node.val;
  }
}`,
        complexity: {
          time: 'O(1) for both get and put operations',
          space: 'O(Capacity) auxiliary memory for pointers and map',
        },
      },
      edgeCases: [
        'Capacity equal to 1: every new insertion replaces the single item',
        'Key update: putting an existing key should update value and refresh recency without increasing size',
        'Eviction on full capacity must correctly prune the node preceding tail and remove from map',
      ],
    },
    videoData: {
      title: 'Distributed Caching at Scale: Redis vs Memcached',
      duration: '14:50',
      instructor: 'Marcus Vance (Staff Infrastructure Architect)',
      timestamps: [
        { time: '00:00', label: 'Latency Hierarchy: RAM vs SSD vs Network' },
        { time: '03:15', label: 'Consistent Hashing & Ring Rebalancing' },
        { time: '07:40', label: 'Cache Invalidation: The Hardest Problem in CS' },
        { time: '11:20', label: 'Handling Cache Penetration & Bloom Filters' },
      ],
      summary: 'Explore real-world architecture diagrams for caching millions of QPS at Netflix and Twitter.',
    },
    audioData: {
      title: 'PrepCast Audio Byte · Surviving the Cache Invalidation Interview',
      duration: '07:45',
      audioByteName: 'Episode 21: High Availability Caching',
      transcriptSummary: [
        'There are only two hard things in Computer Science: cache invalidation and naming things.',
        'When an interviewer asks how to keep your cache fresh, don’t just say "set TTL to 1 hour".',
        'Walk them through Write-Through vs Write-Back, and mention CDC (Change Data Capture) with Debezium.',
      ],
    },
    diagramData: {
      type: 'architecture',
      steps: [
        {
          stepNumber: 1,
          title: 'Client sends GET /user/42',
          description: 'Request reaches Application API Gateway.',
          activeNodeId: 'node-client',
        },
        {
          stepNumber: 2,
          title: 'Query Distributed Redis Cluster',
          description: 'Hashed slot lookup in Redis. If key exists -> return in 0.8ms (Cache Hit).',
          activeNodeId: 'node-cache',
        },
        {
          stepNumber: 3,
          title: 'Fallback to PostgreSQL on Cache Miss',
          description: 'Read disk table, write back into Redis with TTL, return to client.',
          activeNodeId: 'node-db',
        },
      ],
      nodes: [
        { id: 'node-client', label: 'Client / App', subtext: 'QPS: 50,000', status: 'highlight' },
        { id: 'node-cache', label: 'Redis Cluster (RAM)', subtext: 'Hit Rate: 98.4%', status: 'active' },
        { id: 'node-db', label: 'PostgreSQL Primary', subtext: 'Disk Storage', status: 'passive' },
      ],
    },
    comicData: {
      title: 'The Speedy Counter Robot & The Dusty Archive',
      themeStory: 'Why a 1MB cache beats a 10TB hard drive when thousands of patrons ask for the same book',
      panels: [
        {
          panelNumber: 1,
          character: 'Librarian Alex',
          dialogue: '"Ten thousand students are all asking for the Physics textbook at 8:00 AM!"',
          narrative: 'The basement stairs are jammed as clerks trudge back and forth to the deep storage vault.',
        },
        {
          panelNumber: 2,
          character: 'Robo-Cache',
          dialogue: '"Hold on! Let me duplicate the top 100 requested books right here on the front counter!"',
          narrative: 'Robo-Cache loads the hot books directly into its instant grab-tray.',
        },
        {
          panelNumber: 3,
          character: 'Student Maya',
          dialogue: '"Wow, I got my book in 0.5 seconds! Did you even go downstairs?"',
          narrative: '99% of requests are satisfied right at the front counter. Zero wait time!',
        },
        {
          panelNumber: 4,
          character: 'Robo-Cache',
          dialogue: '"And when nobody asks for a book for 3 days, out it goes to make room for new trends!"',
          narrative: 'LRU eviction keeps the counter lean, lightning fast, and always relevant.',
        },
      ],
    },
    interactiveData: {
      title: 'Interactive LRU Cache Inspector',
      description: 'Observe how items move to the Head on access and get evicted from the Tail when capacity (4) is exceeded.',
      initialArray: [101, 102, 103, 104],
      targetValue: 4,
    },
    flashcards: [
      {
        id: 'fc-c1',
        question: 'What data structures are combined to achieve O(1) get and put in an LRU cache?',
        answer: 'Hash Map + Doubly Linked List',
        explanation: 'Hash map gives O(1) node lookup by key; Doubly linked list allows O(1) removal and insertion to the head.',
      },
      {
        id: 'fc-c2',
        question: 'What is Cache Penetration and how do you protect your system against it?',
        answer: 'Queries for keys that do not exist in either cache or database.',
        explanation: 'Attackers or bugs query non-existent keys repeatedly. Protect with Bloom Filters or caching null values with short TTL.',
      },
    ],
    quiz: [
      {
        id: 'qc-1',
        question: 'Which caching strategy writes data to persistent storage asynchronously after writing to memory?',
        options: ['Write-Through', 'Write-Behind (Write-Back)', 'Cache-Aside', 'Read-Through'],
        correctIndex: 1,
        explanation: 'Write-Behind immediately acknowledges the client and flushes writes to disk in background batches.',
      },
      {
        id: 'qc-2',
        question: 'What is the purpose of consistent hashing in a distributed cache cluster?',
        options: [
          'To encrypt client passwords',
          'To minimize key remapping when cache nodes are added or removed',
          'To compress string values in RAM',
          'To run garbage collection faster',
        ],
        correctIndex: 1,
        explanation: 'With regular hash(key) % N, changing N remaps almost 100% of keys. Consistent hashing remaps only K/N keys.',
      },
    ],
  },
  {
    id: 'topic-database-indexing',
    title: 'Database Indexing: B-Trees vs LSM-Trees',
    subject: 'Core Subjects',
    sheetName: 'Sheet 01 · DBMS & SQL Optimization',
    difficulty: 'Medium',
    estimatedMinutes: 20,
    tags: ['DBMS', 'SQL', 'B-Tree', 'LSM-Tree', 'Performance'],
    levelFraming: {
      Beginner: {
        summary: 'An index is the alphabetized index at the back of a textbook: instead of reading all 500 pages (table scan), you flip straight to page 42.',
        focusTip: 'Learn why indexes make SELECT fast but slow down INSERT and UPDATE.',
      },
      Intermediate: {
        summary: 'B+Trees maintain balanced multi-way search trees with high fanout on disk, optimizing sequential range scans and point lookups in O(log N).',
        focusTip: 'Master composite indexes and the leftmost prefix rule in relational databases.',
      },
      Advanced: {
        summary: 'Compare B-Tree (in-place write, write amplification on random I/O) against LSM-Trees (log-structured append-only, SSTables, compaction, read amplification).',
        focusTip: 'Contrast MySQL InnoDB Clustered Index with Cassandra and RocksDB write paths.',
      },
    },
    textNotes: {
      introduction:
        'Without indexes, a database must examine every single page of storage (Full Table Scan O(N)). Proper index architecture turns multi-second queries into sub-millisecond lookups.',
      keyConcepts: [
        {
          title: 'B+ Tree Anatomy',
          description:
            'Internal nodes store search keys as navigational guides. Leaf nodes hold actual row pointers or data, linked horizontally as a doubly linked list for blazing fast range queries (e.g. BETWEEN 20 and 50).',
        },
        {
          title: 'Clustered vs Non-Clustered Indexes',
          description:
            'A Clustered Index dictates the physical ordering of records on disk (only 1 per table, typically the Primary Key). Secondary/Non-clustered indexes point back to the clustered key.',
        },
        {
          title: 'LSM-Trees in High Write Workloads',
          description:
            'Log-Structured Merge Trees write sequentially to an in-memory MemTable and write-ahead log (WAL), then flush immutable SSTables to disk, running background compactions.',
        },
      ],
      codeSnippet: {
        language: 'sql',
        code: `-- Creating a composite index with leftmost prefix optimization
CREATE INDEX idx_user_org_created 
ON users (org_id, created_at DESC);

-- This query uses the index fully:
EXPLAIN ANALYZE
SELECT id, email, created_at 
FROM users 
WHERE org_id = 'org_992' 
  AND created_at >= '2026-01-01'
ORDER BY created_at DESC 
LIMIT 20;`,
        complexity: {
          time: 'Index seek: O(log_B N) where B is page fanout (usually 100-200)',
          space: 'Requires auxiliary disk storage for index tree pages',
        },
      },
      edgeCases: [
        'Using functions on indexed columns (e.g. WHERE UPPER(name) = "JOHN") invalidates the index unless functional indexes are defined',
        'Low cardinality columns (e.g. boolean flag is_active) have poor selectivity and optimizer may default to full scan',
      ],
    },
    videoData: {
      title: 'How PostgreSQL and MySQL Actually Store Indexes',
      duration: '09:30',
      instructor: 'David Kim (Database Reliability Engineer)',
      timestamps: [
        { time: '00:00', label: 'Visualizing B+ Tree Page Splits' },
        { time: '03:00', label: 'Index Scan vs Index Only Scan' },
        { time: '06:15', label: 'LSM-Trees in RocksDB and Scylla' },
      ],
      summary: 'Understand disk page geometry, fill factors, and the leftmost prefix principle.',
    },
    audioData: {
      title: 'PrepCast Audio Byte · Why Did My Index Get Ignored?',
      duration: '05:40',
      audioByteName: 'Episode 08: SQL Query Optimizer Secrets',
      transcriptSummary: [
        'Ever added an index and your query was still slow?',
        'The query planner calculates cost. If your table has only 200 rows, a sequential scan is faster than jumping between disk pages.',
        'Watch out for implicit type casting and leading wildcard LIKE operators.',
      ],
    },
    diagramData: {
      type: 'flow',
      steps: [
        { stepNumber: 1, title: 'Root Page Inspection', description: 'Root node evaluated in memory. Key 45 > 30, branch right.', activeNodeId: 'node-root' },
        { stepNumber: 2, title: 'Intermediate Node Branching', description: 'Directs to Page #14 containing keys 40 to 60.', activeNodeId: 'node-mid' },
        { stepNumber: 3, title: 'Leaf Page Read', description: 'Exact row pointer obtained. Direct disk page retrieval.', activeNodeId: 'node-leaf' },
      ],
      nodes: [
        { id: 'node-root', label: 'Root [30 | 70]', subtext: 'Depth 0', status: 'highlight' },
        { id: 'node-mid', label: 'Page #14 [40 | 55]', subtext: 'Depth 1', status: 'active' },
        { id: 'node-leaf', label: 'Leaf Page [Row #45 Pointer]', subtext: 'Linked Leaves', status: 'passive' },
      ],
    },
    comicData: {
      title: 'The Index Detective & The Endless Filing Cabinet',
      themeStory: 'How an index book turns an exhausting file search into a 3-second breeze',
      panels: [
        {
          panelNumber: 1,
          character: 'Detective Frank',
          dialogue: '"We have 10 million suspect profiles! Finding Jane Doe will take all month!"',
          narrative: 'Frank stares at a warehouse filled with dusty metal filing cabinets.',
        },
        {
          panelNumber: 2,
          character: 'Smart Intern Bot',
          dialogue: '"Check the B+ Tree directory desk! It sorts keys by last name and gives you the exact drawer!"',
          narrative: 'Bot opens the sleek B-Tree index ledger with color-coded index tabs.',
        },
        {
          panelNumber: 3,
          character: 'Detective Frank',
          dialogue: '"Only 3 steps? Section D -> Page 12 -> Cabinet #402! Case solved in 2 milliseconds!"',
          narrative: 'Frank finds the exact record immediately without disturbing the other 9,999,999 folders.',
        },
      ],
    },
    interactiveData: {
      title: 'Interactive B+ Tree Search Traversal',
      description: 'Click to traverse a balanced B-Tree looking for key 45 across root, internal, and leaf pages.',
      initialArray: [10, 25, 30, 45, 60, 75, 90],
      targetValue: 45,
    },
    flashcards: [
      {
        id: 'fc-d1',
        question: 'Why are B+ Trees preferred over regular Binary Search Trees for disk-based databases?',
        answer: 'High fanout (100+ branches per node) minimizes disk I/O depth.',
        explanation: 'Disk reads are orders of magnitude slower than CPU. B+ Tree keeps height small (3-4 levels for billions of rows).',
      },
      {
        id: 'fc-d2',
        question: 'What is a "Covering Index"?',
        answer: 'An index that contains all columns requested by a query, avoiding table row lookup.',
        explanation: 'When an index contains all selected columns, the database performs an "Index Only Scan" without touching heap tables.',
      },
    ],
    quiz: [
      {
        id: 'qd-1',
        question: 'If you have an index on (col_a, col_b, col_c), which query CANNOT use this index effectively?',
        options: [
          'WHERE col_a = 5 AND col_b = 10',
          'WHERE col_a = 5',
          'WHERE col_b = 10 AND col_c = 20',
          'WHERE col_a = 5 AND col_b = 10 AND col_c = 20',
        ],
        correctIndex: 2,
        explanation: 'Due to the leftmost prefix rule, queries omitting the leading column `col_a` cannot utilize the composite index tree.',
      },
    ],
  },
];

export const prephubSheets: PrephubSheet[] = [
  {
    id: 'sheet-dsa',
    title: 'Data Structures & Algorithms',
    subjectCategory: 'DSA',
    sheetCountLabel: '6 Sheets',
    description: 'Master pattern-based problem solving from two pointers to hard dynamic programming.',
    totalTopics: 180,
    completedTopics: 54,
    topics: sampleTopics,
  },
  {
    id: 'sheet-sysdesign',
    title: 'System Design & Distributed Systems',
    subjectCategory: 'System Design',
    sheetCountLabel: '2 Sheets',
    description: 'High-level architectures, microservices, database sharding, and low-level design patterns.',
    totalTopics: 48,
    completedTopics: 16,
    topics: [sampleTopics[1]],
  },
  {
    id: 'sheet-coresubjects',
    title: 'Core Subjects (DBMS, OS, Computer Networks)',
    subjectCategory: 'Core Subjects',
    sheetCountLabel: '6 Sheets',
    description: 'Operating systems concurrency, SQL optimization, TCP/IP handshake, and OOP design.',
    totalTopics: 72,
    completedTopics: 28,
    topics: [sampleTopics[2]],
  },
  {
    id: 'sheet-dataeng',
    title: 'Data Engineering & Analytics Pipelines',
    subjectCategory: 'Data Engineering',
    sheetCountLabel: '2 Sheets',
    description: 'ETL pipelines, Apache Spark transformations, Kafka event streaming, and data warehousing.',
    totalTopics: 32,
    completedTopics: 8,
    topics: [sampleTopics[1]],
  },
];

export const sampleOpportunities: OpportunityItem[] = [
  {
    id: 'opp-hack-1',
    type: 'hackathon',
    title: 'Google Solution Challenge 2026',
    organization: 'Google Developer Student Clubs',
    logo: '🌐',
    location: 'Global / Virtual',
    eligibility: 'All Engineering & CS Undergraduates',
    stipendOrSalary: '$12,000 Prize Pool + Mentorship',
    deadline: 'April 15, 2026',
    daysLeft: 8,
    appliedCount: 4120,
    tags: ['AI/ML', 'Cloud', 'Open Track', 'Global'],
    mode: 'Remote',
  },
  {
    id: 'opp-intern-1',
    type: 'internship',
    title: 'Software Engineering Intern — Summer 2026',
    organization: 'Microsoft India Development Center',
    logo: '💻',
    location: 'Bengaluru / Hyderabad',
    eligibility: 'Pre-final Year (Batch of 2027)',
    stipendOrSalary: '₹1,25,000 / month + Housing',
    deadline: 'April 04, 2026',
    daysLeft: 4,
    appliedCount: 6840,
    tags: ['C++', 'Distributed Systems', 'Azure', 'High Conversion'],
    mode: 'Hybrid',
  },
  {
    id: 'opp-job-1',
    type: 'job',
    title: 'Associate Software Engineer (Graduate SDE-1)',
    organization: 'Atlassian',
    logo: '🚀',
    location: 'Bengaluru (Remote-friendly)',
    eligibility: 'Graduating Batch 2026 (B.Tech / M.Tech / MCA)',
    stipendOrSalary: '₹28,50,000 CTC + RSUs',
    deadline: 'April 10, 2026',
    daysLeft: 12,
    appliedCount: 9230,
    tags: ['Java', 'React', 'Microservices', 'Top Tier'],
    mode: 'Remote',
  },
  {
    id: 'opp-intern-2',
    type: 'internship',
    title: 'Platform Infrastructure Engineering Intern',
    organization: 'Stripe',
    logo: '💳',
    location: 'Singapore / Remote AP',
    eligibility: 'Students with Strong CS Fundamentals & Linux',
    stipendOrSalary: '$4,500 / month stipend',
    deadline: 'April 20, 2026',
    daysLeft: 16,
    appliedCount: 2310,
    tags: ['Go', 'Kubernetes', 'High Scale'],
    mode: 'Remote',
  },
  {
    id: 'opp-hack-2',
    type: 'hackathon',
    title: 'Smart India Hackathon 2026 (Software Edition)',
    organization: 'Ministry of Education & AICTE',
    logo: '🇮🇳',
    location: 'Nodal Centers Across India',
    eligibility: 'Indian College Students (Teams of 6)',
    stipendOrSalary: '₹1,00,000 per problem statement',
    deadline: 'April 30, 2026',
    daysLeft: 24,
    appliedCount: 15400,
    tags: ['Government', 'Public Tech', 'Hardware/Software'],
    mode: 'On-site',
  },
  {
    id: 'opp-job-2',
    type: 'job',
    title: 'Backend Software Engineer — Core Logistics',
    organization: 'Swiggy',
    logo: '🛵',
    location: 'Bengaluru',
    eligibility: 'Batch 2025/2026 with Go/Java proficiency',
    stipendOrSalary: '₹22,00,000 CTC',
    deadline: 'May 01, 2026',
    daysLeft: 27,
    appliedCount: 5120,
    tags: ['Go', 'Redis', 'Kafka', 'High Concurrency'],
    mode: 'Hybrid',
  },
];

export const sampleCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    author: {
      name: 'Rohan Deshmukh',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      role: 'Placed at Microsoft IDC',
      companyOrCollege: 'IIT Kharagpur 2026',
    },
    title: 'Cracked Microsoft SDE Intern (Off-Campus) — Complete 4-Round Breakdown & Questions',
    content:
      'Hey Smart Intern folks! Just received my offer letter for Microsoft Summer 2026. Round 1 was Codility (2 questions: Two pointers & Graph BFS). Round 2 was technical deep dive into Sliding Window invariants and Trie autocomplete. Round 3 tested OS deadlock handling and virtual memory. Round 4 was behavioural + low level design. The biggest game changer was practicing multi-format revision—visualizing pointer steps before writing a single line of code saved me 15 minutes in round 2!',
    category: 'Interview Experience',
    tags: ['Microsoft', 'Interview Experience', 'Off-Campus', 'SDE-Intern'],
    postedAt: '2 hours ago',
    upvotes: 142,
    views: 1890,
    commentsCount: 23,
    isUpvoted: true,
    comments: [
      {
        id: 'c-1',
        author: 'Ananya Roy',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
        text: 'Congratulations Rohan! Did they ask any live system design or was it mostly data structures?',
        timeAgo: '1 hour ago',
      },
      {
        id: 'c-2',
        author: 'Rohan Deshmukh',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
        text: 'Mostly LLD (Object Oriented Design of an in-memory key-value cache with LRU) and DSA!',
        timeAgo: '45 mins ago',
      },
    ],
  },
  {
    id: 'post-2',
    author: {
      name: 'Sneha Patel',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      role: 'SDE-1 Placed',
      companyOrCollege: 'NIT Trichy',
    },
    title: 'From 20 rejections to Amazon SDE-1: How Planly’s recovery sprints saved my consistency',
    content:
      'I used to get discouraged every time college exams forced me to miss 4 days of coding. Planly’s "Missed a Day" recovery feature automatically smoothed my weekly tasks into weekend buffer blocks instead of creating overwhelming backlog guilt. Consistency > Intensity.',
    category: 'Success Stories',
    tags: ['Amazon', 'Consistency', 'StudyPlanner', 'Motivation'],
    postedAt: 'Yesterday',
    upvotes: 218,
    views: 3410,
    commentsCount: 31,
    isUpvoted: false,
    comments: [
      {
        id: 'c-3',
        author: 'Vikram Mehta',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
        text: 'Inspiring story! How many LeetCode questions did you complete before interviews?',
        timeAgo: '18 hours ago',
      },
    ],
  },
  {
    id: 'post-3',
    author: {
      name: 'Aditya Verma',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
      role: 'Final Year Student',
      companyOrCollege: 'BITS Pilani',
    },
    title: 'My Drop: Curated Cheatsheet for Redis Eviction Patterns & Distributed Locking',
    content:
      'Shared my personal notes on Redis Redlock, memory defragmentation, and TTL jitter to prevent cache stampedes. Check it out and let me know if you want the Kafka cheatsheet next!',
    category: 'My Drops',
    tags: ['Cheatsheet', 'Redis', 'Backend', 'SystemDesign'],
    postedAt: '3 days ago',
    upvotes: 95,
    views: 1240,
    commentsCount: 14,
    isUpvoted: false,
    comments: [],
  },
];

export const sampleCourses: CourseItem[] = [
  {
    id: 'course-fullstack',
    title: 'Fullstack Next.js & Distributed Systems',
    category: 'Development',
    subCategory: 'Web Development',
    instructor: 'Alex Thorne (Principal Engineer)',
    level: 'Intermediate',
    progressPercentage: 68,
    totalModules: 14,
    completedModules: 9,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=80',
    nextTopicId: 'topic-sliding-window',
  },
  {
    id: 'course-uiux',
    title: 'Modern UI/UX & Design Systems Engineering',
    category: 'Design',
    subCategory: 'UI/UX',
    instructor: 'Elena Rostova (Lead Product Designer)',
    level: 'Beginner',
    progressPercentage: 45,
    totalModules: 10,
    completedModules: 4,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'course-python-data',
    title: 'Python for Data Analytics & Real-Time ETL',
    category: 'Data Science',
    subCategory: 'Data Analytics',
    instructor: 'Dr. Sameer Joshi (Data Science Lead)',
    level: 'Intermediate',
    progressPercentage: 82,
    totalModules: 12,
    completedModules: 10,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'course-java-core',
    title: 'Enterprise Java, Spring Boot & Concurrency',
    category: 'Development',
    subCategory: 'Java',
    instructor: 'Nikhil Rao (Staff Java Architect)',
    level: 'Advanced',
    progressPercentage: 30,
    totalModules: 16,
    completedModules: 5,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'course-genai',
    title: 'Generative AI & LLM Systems Engineering',
    category: 'Data Science',
    subCategory: 'Generative AI',
    instructor: 'Dr. Sophia Wu (AI Research Scientist)',
    level: 'Advanced',
    progressPercentage: 15,
    totalModules: 8,
    completedModules: 1,
    rating: 5.0,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=80',
  },
  {
    id: 'course-cloud-devops',
    title: 'DevOps, Docker, Kubernetes & AWS Architecture',
    category: 'Development',
    subCategory: 'DevOps & Cloud',
    instructor: 'Jordan Smith (Cloud Architect)',
    level: 'Intermediate',
    progressPercentage: 55,
    totalModules: 12,
    completedModules: 7,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80',
  },
];

export const sampleAssignments: AssignmentItem[] = [
  {
    id: 'asg-1',
    title: 'Implement Custom Concurrent Hash Map with Read-Write Locks',
    courseTitle: 'Enterprise Java, Spring Boot & Concurrency',
    deadline: 'April 02, 2026 (in 4 days)',
    status: 'Pending',
    maxScore: 100,
    instructions:
      'Design a thread-safe map in Java or TypeScript that uses fine-grained segment locking to achieve high concurrent write performance without blocking reads.',
  },
  {
    id: 'asg-2',
    title: 'Figma Component Tokens & Accessible Design System Audit',
    courseTitle: 'Modern UI/UX & Design Systems Engineering',
    deadline: 'March 28, 2026',
    status: 'Submitted',
    score: '94/100',
    maxScore: 100,
    instructions:
      'Audit color contrast ratios and create a unified token dictionary with typography math matching WCAG AA specifications.',
  },
  {
    id: 'asg-3',
    title: 'Kafka Event Consumer Pipeline with Dead Letter Queue',
    courseTitle: 'Fullstack Next.js & Distributed Systems',
    deadline: 'March 18, 2026',
    status: 'Graded',
    score: '98/100',
    maxScore: 100,
    instructions:
      'Build an idempotent event consumer that processes payment events and routes malformed payloads to a dead letter queue after 3 retries.',
  },
];

export const sampleCertificates: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Data Structures & Algorithms Placement Masterclass',
    credentialId: 'SMART-INTERN-2026-DSA-98421',
    issueDate: 'February 2026',
    issuer: 'Smart Intern Academy & Industry Advisory Board',
    skills: ['Sliding Window', 'Dynamic Programming', 'Graph Theory', 'Amortized Analysis', 'Complexity Modeling'],
  },
  {
    id: 'cert-2',
    title: 'High-Throughput Distributed Systems & Cache Engineering',
    credentialId: 'SMART-INTERN-2026-SYS-14029',
    issueDate: 'January 2026',
    issuer: 'Smart Intern Technical Certification Authority',
    skills: ['Redis Caching', 'Consistent Hashing', 'Database Sharding', 'Message Queues'],
  },
];

export const sampleNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Microsoft SDE Intern Deadline Approaching',
    description: 'Applications close in 4 days. 6,840 students have submitted.',
    timeAgo: '20 mins ago',
    type: 'opportunity',
    unread: true,
    targetRoute: 'internships',
  },
  {
    id: 'notif-2',
    title: 'Problem of the Day is Live (+20 XP)',
    description: 'Solve "Minimum Window Substring" before midnight to keep your 14-day streak alive!',
    timeAgo: '2 hours ago',
    type: 'study',
    unread: true,
    targetRoute: 'dashboard',
  },
  {
    id: 'notif-3',
    title: 'Assignment Graded: Kafka Consumer Pipeline',
    description: 'You scored 98/100! Your instructor left positive feedback on idempotent handling.',
    timeAgo: '1 day ago',
    type: 'achievement',
    unread: false,
    targetRoute: 'assignments',
  },
];

export const initialRoadmapSteps = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'Understanding Your Goals',
    tagline: 'Diagnose current baseline and lock target company tier',
    description: 'Map out whether you are targeting Top Tier product firms, high-growth startups, or core engineering roles.',
    status: 'completed' as const,
    keyOutputs: ['Target: SDE-1 @ FAANG/Tier-1', 'Timeline: 90 Days', 'Weekly Commitment: 15 Hours'],
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'Personalized Weekly Sprints',
    tagline: 'AI structured 4-week iterative curriculum',
    description: 'Sprint 1: Two Pointers & Sliding Window; Sprint 2: Hard Graphs & DP; Sprint 3: High-Level System Design; Sprint 4: Mock Interviews.',
    status: 'in-progress' as const,
    keyOutputs: ['Current: Sprint 2 (Week 3 of 4)', '7 of 10 tasks solved this week', 'Target accuracy: > 85%'],
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'Solve & Practice',
    tagline: 'Pattern-based problem set with multi-format breakdowns',
    description: 'Curated list of 18 high-yield patterns covering 90% of technical interview questions.',
    status: 'in-progress' as const,
    keyOutputs: ['54 problems solved', 'Average solve time: 18m 30s', 'Top mastery: Sliding Window'],
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'Track Your Time',
    tagline: 'Integrated Pomodoro focus sessions and telemetry',
    description: 'Real-time focus session tracker logging deep work vs passive review.',
    status: 'pending' as const,
    keyOutputs: ['14.5 hours logged this week', 'Daily target: 2.5 hours', 'Focus ratio: 92%'],
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'Progress Tracker & Skill Radar',
    tagline: 'Real-time capability assessment across 6 core pillars',
    description: 'Track how your interview readiness score evolves as you finish revision quizzes.',
    status: 'pending' as const,
    keyOutputs: ['DSA: 78%', 'System Design: 62%', 'Core CS: 71%'],
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'Missed a Day / Task Recovery Handler',
    tagline: 'Zero guilt adaptive reshuffling',
    description: 'Missed a scheduled day due to college exams or travel? Click to automatically reallocate tasks into weekend buffer blocks.',
    status: 'pending' as const,
    keyOutputs: ['Buffer blocks: Saturday 2h, Sunday 2h', 'Rescheduling safety net active'],
  },
];
