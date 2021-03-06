import axios from 'axios';
import { proxyImage } from 'src/utils';

export async function getStory({ commit }, id) {
  const { data: story } = await axios.get(`/news/${id}`);

  story.image = proxyImage(story.image);
  story.body = story.body.replace(/<script.*<\/script>/g, '');
  story.body = story.body.replace(/<div class="img-place-holder"><\/div>/, '');
  story.body = story.body.replace(
    /<img(.*?)src="(.*?)"(.*?)>/g,
    (_, p1, p2, p3) => `<img${p1}src="${proxyImage(p2)}"${p3}>`,
  );

  if (story.section) {
    story.section.thumbnail = proxyImage(story.section.thumbnail);
  }

  commit('setStory', story);
}

export async function getExtra({ commit }, id) {
  const { data: extra } = await axios.get(`/extra/${id}`);

  commit('setExtra', extra);
}
