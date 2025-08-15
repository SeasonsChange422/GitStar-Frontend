<template>
  <div class="page">
    <div class="page-left">
      <div class="page-left-header">
        <div class="header-title">我的项目</div>
        <div class="header-btn" @click="router.push('/newProject')">新建</div>
      </div>
      <div class="project-list">
        <LiteProjectComponent v-for="project in projectList" :key="project.id" :project="project">
        </LiteProjectComponent>
      </div>
      <div class="more" @click="router.push('/user?tabs=project')">更多...</div>
    </div>
    <div class="page-right">
      <div class="page-right-center">
        <div class="page-right-center-left">
          <div class="latest-project">
            <div class="latest-project-title">搜索</div>
            <input class="search" v-model="searchInput" @keyup.enter="router.push(`/search?key=${searchInput}`)">
          </div>
          <div class="latest-project" v-if="latestProjectList.length != 0">
            <div class="latest-project-title">最新项目</div>
            <HomeProjectComponent v-for="project in latestProjectList" :key="project.id" :project="project">
            </HomeProjectComponent>
            <div class="more" @click="getProjectListFunction">更多...</div>
          </div>
        </div>
        <div class="page-right-center-right">
          <v-carousel hide-delimiters height="300" show-arrows="hover" cycle="3" style="border-radius:16px">
            <v-carousel-item v-for="(item, i) in noticeList" :key="i" :src="item.img" cover>
              <div class="d-flex fill-height justify-center align-center">
                <div class="notice-text">
                  {{ item.text }}
                </div>
              </div>
            </v-carousel-item>
          </v-carousel>
          <div class="latest-post">
            <div class="latest-project-title">最新帖子</div>
            <br />
            <searchPostComponent v-for="post in latestPostList" :key="post.id" :post="post">
            </searchPostComponent>
            <div class="more" @click="getPostListFunction">更多...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Notice } from "@/api/notice/noticeType";
import { Project } from "@/api/project/projectType";
import { Page } from "@/api/common/pageType";
import { Post } from "@/api/post/postType";
import { getPostList } from "@/api/post/postApi";
import { getNoticeList } from "@/api/notice/noticeApi";
import { getProjectByToken, getProjectList } from "@/api/project/projectApi";
import router from "@/router";
import LitePostComponent from "../../components/litePostComponent.vue";
const projectList = ref<Project[]>([]);
const latestProjectList = ref<Project[]>([]);
const latestPostList = ref<Post[]>([]);
const projectPage = ref<Page>({
  current: 1,
  size: 10,
});
const postPage = ref<Page>({
  current: 1,
  size: 10,
});
const noticeList = ref<Notice[]>([]);
const searchInput = ref('')
onMounted(() => {
  getProjectListByTokenFunction();
  getProjectListFunction();
  getPostListFunction();
  getNoticeListFunction();
});
const getNoticeListFunction = () => {
  getNoticeList().then((res) => {
    if (res.code == 200) {
      noticeList.value = res.data;
    }
  });
};
const getProjectListByTokenFunction = () => {
  getProjectByToken({
    current: 1,
    size: 10,
  }).then((res: any) => {
    if (res.code == 200) {
      projectList.value = res.data.records.map((item: any) => ({
        ...item,
        id: String(item.id),
      }));
    }
  });
};
const getPostListFunction = () => {
  getPostList(postPage.value).then((res: any) => {
    if (res.code == 200) {
      postPage.value.current++;
      latestPostList.value = latestPostList.value.concat(res.data.records);
    }
  });
};
const getProjectListFunction = () => {
  getProjectList(projectPage.value).then((res: any) => {
    if (res.code == 200) {
      projectPage.value.current++;
      latestProjectList.value = latestProjectList.value.concat(res.data.records);
    }
  });
};
</script>
<style scoped>
.page {
  position: relative;
  height: auto;
  width: 100vw;
  display: flex;
}

.page-left {
  position: relative;
  width: 336px;
  height: auto;
  border-right: #d1d9e0 1px solid;
  border-top: #d1d9e0 1px solid;
}

.page-right {
  width: calc(100vw - 336px);
  height: 100%;
  border-top: #d1d9e0 1px solid;
}

.page-right-center {
  width: 1532px;
  margin: 0 48px;
  padding: 24px 24px 0;
  display: flex;
}

.page-right-center-left {
  width: 856px;
}

.page-right-center-right {
  width: 420px;
  margin-left: 24px;
  padding: 8px;
}

.latest-post {
  padding: 12px;
  width: 100%;
  min-height: 300px;
  margin-top: 24px;
  border: #d1d9e0 1px solid;
  border-radius: 8px;
}

.latest-project {
  width: calc(100% - 48px);
  padding: 24px;
  border-radius: 8px;
  border: #d1d9e0 1px solid;
  margin: 24px;
}

.latest-project-title {
  font-size: 24px;
  font-weight: 600;
}

.search {
  height: 44px;
  padding: 11px 8px;
  border-radius: 12px;
  width: 760px;
  outline: none;
  border: #D1D9E0 1px solid;
}

.search:focus {
  outline: #0969DA 2px solid;
}

.more {
  font-size: 14px;
  font-weight: 600;
  text-decoration: underline;
}

.page-left-header {
  height: 28px;
  width: 100%;
  display: flex;
  padding: 16px;
  justify-content: space-between;
}

.header-title {
  height: 28px;
  font-size: 14px;
  font-weight: 600;
  line-height: 28px;
}

.header-btn {
  height: 28px;
  width: auto;
  margin-left: 8px;
  padding: 0px 12px;
  font-size: 14px;
  line-height: 32px;
  font-weight: 600;
  border-radius: 6px;
  letter-spacing: -0.5px;
  cursor: pointer;
  color: white;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #1f883d;
}

.notice-text {
  font-size: 12px;
  font-weight: 600;
}

.header-btn:hover {
  background-color: #1c8139;
}

.project-list {
  width: 100%;
  padding: 24px;
}

.more {
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
  text-decoration: underline;
}
</style>
