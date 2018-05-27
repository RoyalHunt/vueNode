import axios from 'axios';
import omit from 'lodash/omit';

import router from '@/router';
import config from '@/config';
import Vue from 'vue';

const HOST = config.COMMANGER_HOST_NAME;

// eslint-disable-next-line
export let AXIOS = axios.create({
  headers: { Authorization: window.localStorage.getItem('token') },
});

AXIOS.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      top.location.href = '/login';
    } else {
      return Promise.reject(error);
    }
  },
);

export const createAxiosInstance = (token) => {
  AXIOS = axios.create({
    headers: { Authorization: token },
  });
};

export async function auth(token) {
  const user = await axios.get(`${HOST}/auth/${token}`);
  if (user.data.auth) {
    window.localStorage.setItem('token', token);
    window.localStorage.setItem('user', JSON.stringify(omit(user.data, 'auth')));
    createAxiosInstance(token);
    router.push('/checkin');
  }
}

export async function getLiveKids(communityId) {
  const kids = await AXIOS.get(`${HOST}/ls/${communityId}`);
  return kids.data;
}

export async function addComment(data) {
  const kid = await AXIOS.post(`${HOST}/comments`, data);
  return kid;
}

export async function dismissKid(data) {
  const kid = await AXIOS.post(`${HOST}/dismissed`, data);
  return kid.data;
}

export async function getCommunityInfo(id) {
  const community = await AXIOS.get(`${HOST}/admin`, {
    params: {
      id,
    },
  });
  if (community && community.data) {
    window.localStorage.setItem('communityId', community.data.communityId);
    Vue.prototype.$communityId = window.localStorage.getItem('communityId');
  }
  return community.data;
}

export async function getParents(id) {
  const parents = await AXIOS.get(`${HOST}/admin/parents`, {
    params: {
      id,
    },
  });
  return parents.data;
}

export async function getKids(id) {
  const kids = await AXIOS.get(`${HOST}/admin/kids`, {
    params: {
      id,
    },
  });
  return kids.data;
}

export async function addParent(user) {
  const parent = await AXIOS.post(`${HOST}/admin/parents`, user);
  return parent;
}

export async function addKid(user) {
  const kid = await AXIOS.post(`${HOST}/admin/kids`, user);
  return kid;
}

export async function getParentInfo(id) {
  const parent = await AXIOS.get(`${HOST}/admin/parents/${id}`);
  return parent.data;
}

export async function getKidInfo(id) {
  const kid = await AXIOS.get(`${HOST}/admin/kids/${id}`);
  return kid.data;
}

export async function getRelatedKids({ familyId, communityId }) {
  const kids = await AXIOS.get(`${HOST}/admin/parent/kids`, {
    params: {
      familyId,
      communityId,
    },
  });
  return kids.data;
}

export async function addRelatedParents(parent) {
  const parents = await AXIOS.post(`${HOST}/admin/kid/parents`, parent);
  return parents;
}

export async function getRelatedParents({ familyId, communityId }) {
  const parents = await AXIOS.get(`${HOST}/admin/kid/parents`, {
    params: {
      familyId,
      communityId,
    },
  });
  return parents.data;
}

export async function addRelatedKids(kid) {
  const kids = await AXIOS.post(`${HOST}/admin/parent/kids`, kid);
  return kids;
}

export async function deleteParent(id) {
  const parent = await AXIOS.delete(`${HOST}/admin/parents`, {
    params: {
      id,
    },
  });
  return parent;
}

export async function deleteKid(id) {
  const kid = await AXIOS.delete(`${HOST}/admin/kids`, {
    params: {
      id,
    },
  });
  return kid;
}

export async function editParent(editedParent) {
  const parent = await AXIOS.put(`${HOST}/admin/parents`, editedParent);
  return parent;
}

export async function editKid(editedKidObj) {
  const kid = await AXIOS.put(`${HOST}/admin/kids`, editedKidObj);
  return kid;
}
