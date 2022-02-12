<template>
    <div class="login_container">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="avatar_box">
                <img src="../assets/ayk.jpg" alt="">
            </div>
    <!-- 登录区域 -->
    <el-form ref="loginFromRef" :model="loginFrom" :rules="loginFromRules" label-width="90px" class="login_from">
        <!-- 用户名 -->
        <el-form-item prop="username" label="用户名">
        <el-input v-model="loginFrom.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password" label="密码">
        <el-input v-model="loginFrom.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button type="info" @click="resetLoginFrom">重置</el-button>
        </el-form-item>
    </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
    return{
    //登录数据
        loginFrom:{
            username:'admin',
            password:'123456'
        },
        //表单验证规则
        loginFromRules:{
            username:[
                { required: true, message: '请输入用户名', trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
            password:[{ required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
        }
    };
    },
    methods: {
        resetLoginFrom(){
            this.$refs.loginFromRef.resetFields();
        },
        login(){
            this.$refs.loginFromRef.validate(async valid => {
                if (!valid) return;
                const { data: res } = await this.$http.post("login", this.loginFrom);
                if(res.meta.status !== 200) return this.$message.error("登录失败");
                this.$message.success('登录成功');
                //1.将登录成功的token，保存到客户端的sessionStorage 中
                //1.1 项目中除了登录之外的其他api接口，必须再登录之后才能访问
                //1.2 token 只应在当前页面打开期间生效 ，所以将token 保存在sessionStorage 中
                window.sessionStorage.setItem("token", res.data.token);
                //2. 通过编程式导航跳转到后台页面 路由地址为/home
                this.$router.push("/home")
            });
        }
    }
};
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .avatar_box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #fff;
        margin: -50px auto 0 auto;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #eee;
        }
    }
    }

    .login_from {
        position: absolute;
        bottom: 0;
        widows: 100%;
        padding: 0 50px;
        box-sizing: border-box;
    }

    .btns {
        display: flex;
        justify-content: flex-end;
    }
</style>
