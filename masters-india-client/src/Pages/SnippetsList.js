import { HeartTwoTone, HeartOutlined, CopyOutlined } from '@ant-design/icons';
import { Button, List, Skeleton, Tooltip, message } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import { Select, Switch } from 'antd';
import baseUrl from "../baseUrl";
import { NavLink } from 'react-router-dom'

const { Option } = Select;

const SnippetsList = () => {

    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState([]);
    const [tags, setTags] = useState([]);
    const [count, setCount] = useState(0);
    const [currentTags, setCurrentTags] = useState([])
    const [onlyFav, setOnlyFav] = useState(false)
    const didMount = useRef(false)

    const getSnippets = (tags = []) => {
        axios.get(baseUrl + `/getSnippets`, {
            params: {
                tags: tags,
                count: count,
                user_id: localStorage.getItem('userId'),
                onlyFav: onlyFav
            },
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then((res) => {
                if (res.data.status) {
                    setInitLoading(false);
                    setLoading(false);
                    setList([...list, ...res.data.results]);
                } else {
                    localStorage.removeItem('token')
                    localStorage.removeItem('userId')
                    message.error(res.data.message);
                    window.location.href = 'login'
                }
            }).catch((error) => {
                console.log(error)
                message.error('Please try again');
            })
    }

    const getTags = () => {
        axios.get(baseUrl + `/getTags`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
            .then((res) => {
                if (res.data.status) {
                    setTags(res.data.results);
                } else {
                    localStorage.removeItem('token')
                    localStorage.removeItem('userId')
                    message.error(res.data.message);
                    window.location.href = 'login'
                }
            }).catch((error) => {
                console.log(error)
                message.error('Please try again');
            })
    }

    useEffect(() => {

        const token = localStorage.getItem('token')

        if (!token) {
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            window.location.href = '/login'
        } else {
            if (!didMount.current) {
                getTags();
            } else {
                getSnippets(currentTags);
            }
            didMount.current = true;
        }

    }, [count, currentTags, onlyFav]);


    const onLoadMore = () => {
        setLoading(true);
        setCount(count + 1);
    };

    const markAsFav = (snippetId, index) => {

        axios.post(baseUrl + "/markAsFav", {
            user_id: localStorage.getItem('userId'),
            snippet_id: snippetId
        }, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((res) => {
            if (res.data.status) {
                let temp = [...list]
                temp[index].fav = true
                setList(temp)
                message.success('Added to Favourites');
            } else {
                localStorage.removeItem('token')
                localStorage.removeItem('userId')
                message.error(res.data.message);
                window.location.href = 'login'
            }
        }).catch((error) => {
            console.log(error)
            message.error('Please try again');
        })
    }


    const removeAsFav = (snippetId, index) => {

        axios.post(baseUrl + "/removeAsFav", {
            user_id: localStorage.getItem('userId'),
            snippet_id: snippetId
        }, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        }).then((res) => {
            if (res.data.status) {
                let temp = [...list]
                temp[index].fav = false
                setList(temp)
                message.success('Removed from Favourites');
            } else {
                localStorage.removeItem('token')
                localStorage.removeItem('userId')
                message.error(res.data.message);
                window.location.href = 'login'
            }
        }).catch((error) => {
            console.log(error)
            message.error('Please try again');
        })
    }

    const handleTags = (value) => {
        setLoading(true);
        setCurrentTags(value);
        setList([]);
        setCount(0);
    }

    const copiedToClipboard = () => {
        message.success('Copied to clipboard', 1);
    };

    const loadMore =
        !initLoading && !loading && list.length ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={() => onLoadMore()}>loading more</Button>
            </div>
        ) : null;
    return (
        <>
            <div style={{
                display: 'flex'
            }}>
                <div
                    style={{
                        padding: 15,
                    }}
                >
                    <Switch checkedChildren="Favourites" unCheckedChildren="Favourites" onChange={(checked) => {
                        setLoading(true);
                        setList([])
                        setCount(0)
                        setOnlyFav(checked)
                    }} />
                </div>
                <div
                    style={{
                        padding: 15,
                        flex: "1",
                        textAlign: "right"
                    }}
                >
                    <NavLink
                        to='/login'
                        onClick={() => {
                            localStorage.removeItem('token')
                            localStorage.removeItem('userId')
                        }}
                    >
                        Log Out
                    </NavLink>
                </div>

            </div>

            <div style={{
                padding: 20,
                textAlign: 'center'
            }}>
                <Select
                    mode="tags"
                    style={{
                        width: '80%',
                    }}
                    onChange={handleTags}
                    tokenSeparators={[',']}
                >
                    {
                        tags.map((tag) => {
                            return <Option key={tag.tag}>{tag.tag}</Option>
                        })
                    }
                </Select>

                <List
                    className="demo-loadmore-list"
                    style={{
                        padding: 20,
                        width: "50%",
                        textAlign: 'justify',
                        marginLeft: "25%"
                    }}
                    loading={initLoading}
                    itemLayout="horizontal"
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={(item, index) => (
                        <List.Item
                            actions={[<Tooltip title="Mark as favourite">
                                <Button
                                    shape='circle'
                                    icon={item.fav ? <HeartTwoTone twoToneColor='red' /> : <HeartOutlined />}
                                    onClick={() => item.fav ? removeAsFav(item.id, index) : markAsFav(item.id, index)}
                                />
                            </Tooltip>,
                            <Tooltip title="Copy to Clipboard">
                                <CopyToClipboard text={item.snippet}>
                                    <Button
                                        shape='circle'
                                        icon={<CopyOutlined />}
                                        onClick={copiedToClipboard}
                                    />
                                </CopyToClipboard>
                            </Tooltip>]
                            }
                        >
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    title={`${index}.`}
                                    description={<pre>{item.snippet}</pre>}
                                />
                            </Skeleton>
                        </List.Item >
                    )}
                />
            </div>
        </>
    );
};

export default SnippetsList;