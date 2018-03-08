<template>
    <div id="content-container">
        <h1 class="title">Dream bigger, achieve more.</h1>
        <div>
            <img class="avatar" src="images/avatar.jpg" alt="Avatar"/>
            <p>
                はじめまして．石田直人といいます． 私は井上研究室でソフトウェア工学の研究をしています． 研究室に置いてあるポテトチップスは安くてとてもおいしいです． 研究に疲れたときは仲間と喋ったり，近くにあるカフェを訪れます．好きな言語はC#とTypeScriptです．好きなOSはWindowsです． 最近ドラゴンクエスト11をはじめました．時間に余裕がある時に一気にクリアしたいと思います．ゲームはみんなのGOLFやMETAL GEAR SOLIDが好きです．
            </p>
        </div>
        <div class="links">
            <ul>
                <li>
                    <a href="https://google.com">Papers</a>
                </li>
                <li>
                    <a href="https://google.com">Open Source Projects</a>
                </li>
                <li>
                    <a href="https://google.com">GitHub</a>
                </li>
                <li>
                    <a href="https://google.com">Contact</a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";



@Component({
})
export default class App extends Vue {
}
</script>

<style lang="scss" scoped>
#content-container {
    margin-right: auto;
    margin-left: auto;
    max-width: 600px;
}

h1.title {
    font-weight: 700;
    color: gray;
}

img.avatar {
    width: 120px;
    height: 120px;
    border-radius: 100%;
    margin: 0 0 20px 20px;
    float: right;
    shape-outside: circle();
}

.links ul {
    list-style: none;
    padding: 0;

    li:not(:first-child) {
        margin-top: 8px;
    }

    li a {
        color: #000;
        font-weight: 700;
        text-decoration: none;
        &:hover {
            background: #000;
            color: #fff;
        }
    }
}
</style>

<style lang="scss">
// load grobal style
@import '~../_default.scss';
</style>
