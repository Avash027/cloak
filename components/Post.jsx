import {useState} from 'react';
import { createStyles, Card, ActionIcon, Group, Text, Avatar, Badge,Overlay,Button } from '@mantine/core';
import { Heart, Bookmark, EyeOff } from 'tabler-icons-react';
import { useMediaQuery } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    marginTop:"5rem",
    borderTopColor:"red",
    position:"relative"

  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight:700,
    fontSize:"1.5rem",
    marginBottom:"1rem"
  },

  footer: {
    padding: `${theme.spacing.xs}px ${theme.spacing.lg}px`,
    marginTop: theme.spacing.md,
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },
  showButton:{
    zIndex:2,
    position:"absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
  }

}));


export function Post({
  pid,
  collegeName,
  title,
  profilePicURL,
  authorName,
  createdAt,
  updateLikedPosts,
  likedPosts,
  bookmarkedPosts,
  updateBookmarkedPosts,
  likesCount,
  setPid,
  loggedInUser,
  handlePostDelete,
  toxicity
}) {
  const { classes, theme } = useStyles();
  const midWidth = useMediaQuery("(max-width:1000px)")
  const maxWidth = useMediaQuery("(max-width:400px)")

  const [likes, setLikes] = useState(likesCount);
  const [isVisible, setIsVisible] = useState(toxicity < 0.6);

  const likesHandler = ()=>{
    updateLikedPosts(pid);
    if(isLiked)
      setLikes(prev=>prev-1);
    else 
      setLikes(prev=>prev+1)
  }


  let width = "40rem"
  if(midWidth) width="20rem"
  if(maxWidth) width="10rem"

  const isLiked = likedPosts.indexOf(pid) > -1;
  const isBookMarked = bookmarkedPosts.indexOf(pid)> -1;

  return (
    <Card withBorder p="lg" radius="md" className={classes.card} style={{width}} >

      {!isVisible && <Overlay opacity={0.6} color="#000" blur={7} zIndex={1}>
        </Overlay>}


        {!isVisible && <Button className={classes.showButton} onClick={e=>setIsVisible(true)}>
          This post might be offensive. Do you want to see it?</Button>}

    <div onClick={e=>setPid(pid)} style={{cursor:"pointer"}}>
    <Text weight={700} className={classes.title} mt="xs">
        {title}
      </Text>


      <Badge>{collegeName}</Badge>

      <Group mt="lg">
        <Avatar src={profilePicURL} radius="sm" />
        <div>
          <Text weight={500}>{authorName}</Text>
          <Text size="xs" color="dimmed">
            Posted on {createdAt.getDate()}/{createdAt.getMonth()}/{createdAt.getFullYear()}
          </Text>
        </div>
      </Group>

      </div>

      <Card.Section className={classes.footer}>
        <Group position="apart">
          <Text size="xs" color="dimmed">
            {`This post has ${likes} likes`}
          </Text>
          <Group spacing={0}>
            <ActionIcon>
              <Heart
              onClick={likesHandler}
              size={18} color={theme.colors.red[6]}
              fill={isLiked ? theme.colors.red[6]:"transparent"} />
            </ActionIcon>
            <ActionIcon>
              <Bookmark
              onClick={()=>updateBookmarkedPosts(pid)}
              size={18} color={theme.colors.yellow[6]}
              fill={isBookMarked ? theme.colors.red[6]:"transparent"} />
            </ActionIcon>
            {authorName === loggedInUser.uid && <ActionIcon>
              <EyeOff size={16} color={theme.colors.red[6]} onClick = {e=>handlePostDelete(pid)} />
            </ActionIcon>}
          </Group>
        </Group>
      </Card.Section>
    </Card>
  );
}

export default Post;