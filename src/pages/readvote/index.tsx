import React, { useEffect, useState, useCallback, useMemo } from 'react';
import * as S from './style';
import VoteTitle from '../../components/ReadVote/voteTitle';
import VoteContent from '../../components/ReadVote/voteContent';
import AnswerList from '../../components/ReadVote/answerList';
import { DupleVoteContainer } from '../../components/ReadVote/dupleVoteContainer';
import { useRouter } from 'next/router';
import VoteBtn from '../../components/ReadVote/voteBtn';

interface stateType {
  id: number | undefined;
  category: string | undefined;
  title: string | undefined;
  created_at: any;
  author: string | undefined;
  content: string | undefined;
  image: string | undefined;
  vote: { content: string; count: number }[];
  closedAt: any;
  views: number;
  likes: number;
  duplicate: boolean | undefined;
  voteType: string;
}

interface voteType {
  content: string;
  count: number;
  id: number;
}
const ReadVote = () => {
  const router = useRouter();
  const { pid } = router.query;
  const [data, setData] = useState<stateType>();
  const [voteBtns, setVoteBtns] = useState<voteType[]>();
  const [selectedBtn, setSelectedBtn] = useState<number[]>([]);
  const displayStyle = useMemo((): any => {
    if (data?.voteType === 'image') {
      return { display: 'flex', flexWrap: 'wrap', justifyContent: 'center' };
    } else {
      return;
    }
  }, [data?.voteType]);

  const handleSelectedBtn = useCallback((array: number[]) => {
    setSelectedBtn(array);
  }, []);
  //api요청하는 곳
  useEffect(() => {
    console.log(pid, 'api call');
    const data2 = {
      id: 1,
      category: '음식',
      title: '디카페인 vs 카페인',
      created_at: 20220101,
      author: '김밥',
      content:
        '안녕하세요 점심으로 뭘 먹을지 고민중인데 골라줘!\n반짝이는 피고, 품에 오직 하는 보는 기관과 약동하다. 긴지라 어디 아니더면, 지혜는 너의 유소년에게서 것은 일월과 사막이다. 생의 우리 그것은 그리하였는가? 가슴이 같이, 이상 피부가 찾아 그리하였는가? 실현에 수 그들의 인도하겠다는 위하여서. 가진 새 청춘의 위하여, 없는 현저하게 원대하고, 인간의 철환하였는가?',
      image:
        'https://cdn.pixabay.com/photo/2023/01/01/23/37/woman-7691013_640.jpg',
      // vote: [
      //   { id: 1, content: '카페인', count: 3 },
      //   { id: 2, content: '디카페인', count: 4 },
      //   { id: 3, content: '아무거나', count: 4 },
      //   { id: 4, content: '둘다', count: 4 },
      // ],
      vote: [
        {
          id: 1,
          content:
            'https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032__480.jpg',
          count: 3,
        },
        {
          id: 2,
          content:
            'https://cdn.pixabay.com/photo/2017/03/23/19/57/asparagus-2169305__480.jpg',
          count: 4,
        },
        {
          id: 3,
          content:
            'https://cdn.pixabay.com/photo/2017/01/11/11/33/cake-1971552__480.jpg',
          count: 4,
        },
        {
          id: 4,
          content:
            'https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523__480.jpg',
          count: 4,
        },
        {
          id: 5,
          content:
            'https://cdn.pixabay.com/photo/2018/10/14/18/29/meatloaf-3747129__480.jpg',
          count: 4,
        },
        {
          id: 6,
          content:
            'https://cdn.pixabay.com/photo/2018/05/01/18/21/eclair-3366430__480.jpg',
          count: 4,
        },
      ],
      closedAt: 20220111,
      views: 10,
      likes: 5,
      duplicate: true,
      voteType: 'image',
    };
    setData({ ...data2 });
    setVoteBtns([...data2.vote]);
  }, [pid]);

  return (
    <S.PageContainer>
      <p>
        홈{'>'}카테고리{'>'}게시글
      </p>
      <VoteTitle
        category={data?.category}
        title={data?.title}
        createdAt={data?.created_at}
        author={data?.author}
        dday={data?.closedAt - data?.created_at}
        views={data?.views}
        likes={data?.likes}
      />
      <VoteContent content={data?.content} image={data?.image} />
      <div style={displayStyle}>
        {voteBtns?.map((el, idx) => (
          <DupleVoteContainer
            key={idx}
            id={el.id}
            content={el.content}
            count={el.count}
            selectedBtn={selectedBtn}
            duplicate={data?.duplicate}
            handleSelectedBtn={handleSelectedBtn}
            voteType={data?.voteType}
          />
        ))}
      </div>
      <p style={{ margin: '20px', textAlign: 'center' }}>총투표수: 2222222표</p>
      <VoteBtn />
      <AnswerList />
    </S.PageContainer>
  );
};

export default ReadVote;
