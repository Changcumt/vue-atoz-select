<template>
  <div class="vue-atoz-select">
    <div class="letter-labels">
      <ul @touchstart="startScrollLabels" @touchmove="scrollLabels" @touchend="endScrollLabels">
        <li v-for="item in groupMeta" :class="{active:activeLabel=='label'+item.label || cliclkActiveLabel=='label'+item.label}" :key="item.label" @click="scrollTo(item.label)">{{item.label}} </li>
      </ul>
    </div>
    <div class="data-select-box" ref="dataSelectBox" @scroll="listScroll">
      <div class="data-list">
        <div class="data-group" v-for="(group,index) in groups" :key="index" :ref="'label'+index">
          <div class="letter-label" :class="{active:activeLabel=='label'+index}">
            {{index}}
          </div>
          <div class="data-group-list">
            <div class="data-group-item" v-for="(item,cindex) in group" :key="cindex" @click="selectItem(item)">
              {{item.text}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pinyin from "./pinyin";

export default {
  name: "vue-atoz-select",
  props: {
    datalist: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      activeLabel: "",
      cliclkActiveLabel: "",
      groups: {},
      originGroups: {},
      groupMeta: [],
      scroll: {
        start: false,
        startY: 0
      }
    };
  },
  created() {
    this.initialize();
  },
  methods: {
    startScrollLabels(e) {
      if (e.target.tagName === "LI") {
        this.scroll.start = true;
        this.scroll.startY = e.targetTouches[0].clientY;
      }
    },
    scrollLabels(e) {
      e.preventDefault();
      if (this.scroll.start) {
        let targetIndex = Math.floor(
          (e.targetTouches[0].clientY - this.scroll.startY) / 20
        );
        let maxLength = this.groupMeta.length;
        if (targetIndex >= 0 && targetIndex < maxLength) {
          let activeLabel = this.groupMeta[targetIndex].label;
          this.scrollTo(activeLabel, true);
        }
      }
    },
    endScrollLabels(e) {
      if (this.scroll.start) {
        this.scroll.start = false;
        this.scroll.startY = 0;
      }
    },

    filterDatalist() {
      let tempGroup = Object.assign({},this.originGroups);
      // let searchKey = this.searchCity;
      // if (searchKey) {
      //   var reg = new RegExp("[a-zA-Z]");
      //   searchKey = searchKey.toLowerCase();
      //   let isLetterKey = reg.test(searchKey);
      //   for (const key in tempGroup) {
      //     if (tempGroup.hasOwnProperty(key)) {
      //       if (isLetterKey) {
      //         // 根据字母过滤
      //         tempGroup[key] = tempGroup[key].filter(item => {
      //           return (
      //             item.quanpin.indexOf(searchKey) > -1 ||
      //             item.shengmu.indexOf(searchKey) > -1 ||
      //             item.shouzimu.indexOf(searchKey) > -1
      //           );
      //         });
      //       } else {
      //         // 根据汉字过滤
      //         tempGroup[key] = tempGroup[key].filter(item => {
      //           return (
      //             item.city.indexOf(this.searchCity) > -1 ||
      //             item.specialChinese.indexOf(this.searchCity) > -1
      //           );
      //         });
      //       }
      //       if (tempGroup[key].length == 0) {
      //         delete tempGroup[key];
      //       }
      //     }
      //   }
      // }
      this.groups = tempGroup;
      this.$nextTick(() => {
        this.createGroupMeta();
      });
    },
    scrollTo(label, disableActiveLable = false) {
      if (label) {
        let dataSelectBox = this.$refs["dataSelectBox"];
        let activeLabel = "label" + label;
        let element = this.$refs[activeLabel][0];
        dataSelectBox.scrollTop = element.offsetTop;
        if (!disableActiveLable) {
          this.cliclkActiveLabel = activeLabel;
          this.activeLabel = "";
        } else {
          this.cliclkActiveLabel = "";
        }
      }
    },
    listScroll() {
      let dataSelectBox = this.$refs["dataSelectBox"];
      let scrollTop = dataSelectBox.scrollTop;
      let activeLabel = this.getActiveLabel(scrollTop);
      if (activeLabel) {
        this.activeLabel = "label" + activeLabel;
        this.cliclkActiveLabel = "";
      } else {
        this.activeLabel = "";
      }
    },
    initialize() {
      this.originGroups = Pinyin.toGroup(this.datalist);
      this.filterDatalist();
    },
    createGroupMeta() {
      this.groupMeta = [];
      Object.keys(this.groups).forEach(index => {
        let curLabel = "label" + index;
        let temp = { label: index };
        let element = this.$refs[curLabel][0];
        temp.top = element.offsetTop;
        temp.height = element.offsetHeight;
        this.groupMeta.push(temp);
      });
    },
    getActiveLabel(scrollTop) {
      let curLabel = "";
      let result = this.groupMeta.filter(item => {
        return item.top < scrollTop && scrollTop < item.top + item.height;
      });
      if (result && result[0]) {
        return result[0].label;
      }
    },
    selectItem(item) {
      this.$emit('select',item)
    }
  }
};
</script>

<style scoped>
.vue-atoz-select ul {
  list-style: none;
}
.data-select-box {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}
.letter-labels {
  position: fixed;
  right: 0;
  width: 30px;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  z-index: 999;
  text-align: center;
  color: #a9abc1;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.letter-labels li {
  height: 20px;
}
.letter-labels li.active {
  color: #00d9bb;
}
.letter-label {
  font-size: 16px;
  height: 28px;
  line-height: 28px;
  padding: 0 15px;
  background: #f5f5f5;
  color: #525269;
}

.data-group {
  position: relative;
}
.letter-label.active {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
}
.letter-label.active + .data-group-list {
  padding-top: 30px;
}
.data-group .letter-label {
  font-size: 18px;
}
.data-group-list {
  padding: 0 15px;
}
.data-group-item {
  height: 30px;
  line-height: 30px;
  border-bottom: 1px solid #eaeaea;
  color: #525269;
}
.data-group-item:last-child {
  border-bottom: none;
}
</style>
