import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/core';

import Feedback from '@/components/Feedback';
import { useAuth } from '@/lib/auth';
import { createFeedback } from '@/lib/db';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';

// fetch all feedback for the site, given siteId forwarded by dynamic route
export async function getStaticProps(context) {
  const siteId = context.params.siteId;
  const { feedback } = await getAllFeedback(siteId);

  return {
    props: {
      initialFeedback: feedback
    },
    revalidate: 1
  };
}

// We use getStaticPaths to create a page for each site. If a page has not been created for a site (for example, a brand new site) and the user visits the route, we should generate the site on the fly. This is controlled by the fallback value of tru
export async function getStaticPaths() {
  const { sites } = await getAllSites();

  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString()
    }
  }));

  return {
    paths,
    fallback: true
  };
}

export default function FeedbackPage({ initialFeedback }) {
  const router = useRouter();
  const { siteId } = router.query;
  const auth = useAuth();
  const inputEl = useRef(null);
  const [allFeedback, setAllFeedback] = useState([]);

  useEffect(() => {
    setAllFeedback(initialFeedback);
  }, [initialFeedback]);

  const onSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      author: auth.user.name,
      authorId: auth.user.uid,
      siteId: router.query.siteId,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      provider: auth.user.provider,
      status: 'pending'
    };

    inputEl.current.value = '';
    setAllFeedback((currentFeedback) => [newFeedback, ...currentFeedback]);
    createFeedback(newFeedback);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      width="full"
      maxWidth="700px"
      margin="0 auto"
    >
      {auth.user && (
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input ref={inputEl} id="comment" placeholder="Leave a comment" />
            <Button mt={4} type="submit" fontWeight="medium">
              Add Comment
            </Button>
          </FormControl>
        </Box>
      )}

      {allFeedback &&
        allFeedback.map((feedback) => (
          <Feedback
            key={feedback.id || new Date().getTime().toString()}
            {...feedback}
          />
        ))}
    </Box>
  );
}
