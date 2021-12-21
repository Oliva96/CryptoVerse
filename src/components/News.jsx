import React from 'react';
import {Select, Typography, Row, Col, Avatar, Card} from 'antd';
import moment from 'moment';

import {useGetCryptoNewsQuery} from '../services/cryptoNewsApi';

const demoImage = 'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg';

const {Text, Title} = Typography;
const {Options} = Select; 

const News = ({simplified}) => {
    const count = simplified ? 6 : 12;
    const {data: cryptoNews, isFetching} = useGetCryptoNewsQuery({newsCategory: 'Cryptocurrency', count});

    if(isFetching) return 'Loading...';
   
    return (
       <Row gutter={[24, 24]} >
           {cryptoNews.value.map((news, i) => (
               <Col xs={24} sm={12} lg={8} key={i}>
                   <Card hoverable className='news-card'>
                        <a href={news.url} target="_blank" rel='noreferrer'>
                            <div className='news-image-container'>
                                <Title className='news-title' level={4}>{news.name}</Title>
                                <img src={news?.image?.thumbnail?.contentUrl || demoImage} alt='news'></img>
                            </div>
                            <p>
                                {news.description > 100
                                    ? `${news.description.substring(0,95)} ...`
                                    : news.description
                                }
                            </p>
                            <div className='provider-container'>
                                <div>
                                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt='news'></Avatar>
                                    <Text className='provider=name'>{news.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news.dataPublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                   </Card>
               </Col>
           ))}
       </Row>
    )
}

export default News
