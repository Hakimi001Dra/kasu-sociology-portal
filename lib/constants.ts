import type { JournalArticle } from '@/types/journal'
import type { FacultyMember } from '@/types/faculty'
import type { NewsEvent } from '@/types/news'

export const journalArticles: JournalArticle[] = [
  {
    id: '1',
    slug: 'urban-poverty-social-exclusion-kaduna',
    title: 'Urban Poverty and Social Exclusion in Kaduna Metropolis: A Structural Analysis',
    authors: 'Dr. Aisha Bello-Umar, Prof. Salihu Garba',
    abstract: 'This paper examines the structural determinants of urban poverty among low-income households in Kaduna, drawing on household surveys and qualitative interviews conducted between 2023 and 2024. The findings reveal that spatial segregation and limited access to social capital are primary drivers of exclusion.',
    volume: 12,
    year: 2025,
    publishedDate: 'Jun 2025',
    tags: ['Urban Studies', 'Policy'],
  },
  {
    id: '2',
    slug: 'gender-dynamics-agricultural-labour',
    title: 'Gender Dynamics and Agricultural Labour in Rural Kaduna State',
    authors: 'Dr. Fatima Tanko, Dr. Ibrahim Musa',
    abstract: 'An ethnographic study of gender roles in smallholder farming communities across three local government areas. The study challenges dominant narratives of passive female participation and documents forms of negotiated authority in household agricultural decision-making.',
    volume: 12,
    year: 2025,
    publishedDate: 'Jun 2025',
    tags: ['Gender', 'Rural'],
  },
  {
    id: '3',
    slug: 'ethnicity-identity-political-mobilisation',
    title: 'Ethnicity, Identity, and Political Mobilisation in Post-Conflict Northern Nigeria',
    authors: 'Prof. Yusuf Danladi, Prof. Maryam Aliyu',
    abstract: 'Using social movement theory and in-depth elite interviews, this article analyses how ethnic identities are instrumentalised in political campaigns in three northern Nigerian states, with implications for national cohesion and democratic governance.',
    volume: 11,
    year: 2024,
    publishedDate: 'Dec 2024',
    tags: ['Politics', 'Identity'],
  },
  {
    id: '4',
    slug: 'social-capital-youth-unemployment',
    title: 'Social Capital and Youth Unemployment: Evidence from Kaduna State',
    authors: 'Dr. Rabi Hassan, Dr. Uche Okonkwo',
    abstract: 'This mixed-methods study explores how bonding and bridging social capital influence labour market outcomes for youth aged 18–35 in Kaduna State. Survey data from 1,200 respondents is complemented by 40 semi-structured interviews.',
    volume: 11,
    year: 2024,
    publishedDate: 'Jun 2024',
    tags: ['Social Capital', 'Youth'],
  },
  {
    id: '5',
    slug: 'religion-social-norms-health-seeking',
    title: 'Religion, Social Norms, and Health-Seeking Behaviour in Kaduna Communities',
    authors: 'Dr. Amina Lawal, Dr. Peter Eze',
    abstract: 'A community-based study examining how Islamic and Christian norms shape individual health behaviours in a pluralistic urban environment. The paper contributes to the sociology of health literature on faith-based health determinants in sub-Saharan Africa.',
    volume: 10,
    year: 2023,
    publishedDate: 'Dec 2023',
    tags: ['Religion', 'Health'],
  },
  {
    id: '6',
    slug: 'climate-change-displacement-lake-chad',
    title: 'Climate Change, Displacement, and Social Vulnerability in the Lake Chad Basin',
    authors: 'Prof. Sani Abdullahi, Dr. Chidinma Obi',
    abstract: 'Drawing on field data from climate-displaced communities in Borno and Yobe states, this paper develops a social vulnerability index and identifies structural gaps in Nigeria\'s national displacement response policy framework.',
    volume: 10,
    year: 2023,
    publishedDate: 'Jun 2023',
    tags: ['Climate', 'Displacement'],
  },
]

export const facultyMembers: FacultyMember[] = [
  { id: '1', name: 'Prof. Maryam Aliyu', title: 'Head of Department / Professor', specialization: 'Social Stratification, Development Sociology' },
  { id: '2', name: 'Prof. Yusuf Danladi', title: 'Professor', specialization: 'Political Sociology, Ethnicity & Identity' },
  { id: '3', name: 'Dr. Aisha Bello-Umar', title: 'Senior Lecturer', specialization: 'Urban Sociology, Social Exclusion' },
  { id: '4', name: 'Dr. Fatima Tanko', title: 'Senior Lecturer', specialization: 'Gender Studies, Rural Sociology' },
  { id: '5', name: 'Prof. Sani Abdullahi', title: 'Professor', specialization: 'Environmental Sociology, Migration' },
  { id: '6', name: 'Dr. Rabi Hassan', title: 'Lecturer I', specialization: 'Social Capital, Youth Studies' },
  { id: '7', name: 'Dr. Amina Lawal', title: 'Lecturer I', specialization: 'Sociology of Health, Religion' },
  { id: '8', name: 'Dr. Ibrahim Musa', title: 'Lecturer II', specialization: 'Criminology, Social Control' },
]

export const newsEvents: NewsEvent[] = [
  {
    id: '1',
    title: 'Annual Departmental Colloquium on Social Change in Northern Nigeria',
    date: '2025-07-18',
    type: 'Seminar',
    description: 'An open forum for faculty and postgraduate students to present ongoing research. Papers welcome on urbanisation, conflict, health, and governance. Venue: Faculty of Social Sciences Auditorium, KASU Main Campus.',
  },
  {
    id: '2',
    title: 'KJSSS Volume 13 — Submission Deadline Extended to 5 August 2025',
    date: '2025-08-05',
    type: 'Call for Papers',
    description: 'The editorial board invites original research articles, reviews, and conceptual papers for the next volume of the KASU Journal of Sociology & Social Sciences. All submissions are double-blind peer reviewed.',
  },
  {
    id: '3',
    title: 'Prof. Yusuf Danladi Appointed to National Population Commission Advisory Board',
    date: '2025-06-22',
    type: 'Department News',
    description: 'The department congratulates Prof. Danladi on his appointment as a technical advisor to the National Population Commission\'s Research and Statistics Division. His tenure begins July 2025.',
  },
  {
    id: '4',
    title: 'Research Methods Workshop: Qualitative Data Analysis with NVivo',
    date: '2025-06-10',
    type: 'Workshop',
    description: 'A two-day hands-on workshop for postgraduate students and early-career researchers. Registration is free for current KASU students. Limited to 30 participants.',
  },
]