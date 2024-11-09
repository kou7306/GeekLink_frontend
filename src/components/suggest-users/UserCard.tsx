import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import FollowButton from '@/components/profile/FollowButton';
import Chips from './Chips';
import { getUuidFromCookie } from '@/actions/users';
import { Profile } from '@/types/user';

type Props = {
  user: Profile;
  chipOption:
    | "overAll"
    | "sameTech"
    | "samePlace"
    | "sameAge"
    | "sameGraduate"
    | "sameDesiredOccupation";
};

const UserCard = ({ user, chipOption }: Props) => {
  const uuid = getUuidFromCookie();

  return (
    <Box
      sx={{
        color: 'black',
        display: 'block',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '250px',
        transition: 'background-color 0.3s, transform 0.3s',
        backgroundColor: 'background.paper',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Link href={`/my-page/${user.user_id}`} passHref>
        <Box
          component="a"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '1rem',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            width: '250px',
            height: 'auto',
            minHeight: '10rem',
            pointerEvents: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              flexGrow: 1,
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '3rem',
                height: '3rem',
                borderRadius: '50%',
                overflow: 'hidden',
                marginRight: '0.75rem',
              }}
            >
              <Image
                src={user.image_url || '/user.svg'}
                layout="fill"
                objectFit="cover"
                alt={user.name}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="h2" color="text.primary">
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.occupation}
              </Typography>
            </Box>
          </Box>
          <Chips user={user} chipOption={chipOption} />
        </Box>
      </Link>
      <Box sx={{ pointerEvents: 'auto', backgroundColor: 'background.paper', mt: -3, ml: 1.5 }}>
        {uuid && <FollowButton userId={user.user_id} isMe={false} myID={uuid} />}
      </Box>
    </Box>
  );
};

export default UserCard;