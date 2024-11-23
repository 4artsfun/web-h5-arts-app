<script setup>
  import { ref } from 'vue'
  import GlobalDialog from '../../../components/global-dialog/global-dialog.vue'
  import WalletOptions from './WalletOptions.vue'
  import { useStore } from 'vuex'
  const store = useStore()

  import { useUserLogin } from '../hooks/userLogin'
  const { username, password, loginFunc, loginLoading } = useUserLogin()
  const formType = ref('login')
  const saveForm = () => {
    loginFunc(formType.value)
  }

  import { useTwitterLogin } from '../hooks/twitterLogin'
  const { redirectTwitter } = useTwitterLogin()

  import { useTgLogin } from '../hooks/tgLogin'
  const { redirectTg } = useTgLogin()
</script>

<template>
  <GlobalDialog v-model:show="store.state.loginShow" title="Login 4Arts">
    <div class="content">
      <div class="section">
        <div class="section-title">
          <div class="reg-tips" v-if="formType === 'login'">
            <div>Don't have an account yet?</div>
            <div class="reg-btn" @click="formType = 'register'">Register</div>
          </div>
          <div class="reg-tips" v-else>
            <div>Go back to</div>
            <div class="reg-btn" @click="formType = 'login'">Log in</div>
          </div>
        </div>

        <div class="form">
          <div class="form-item">
            <input
              class="input"
              v-model.trim="username"
              placeholder="Username"
            />
          </div>
          <div class="form-item">
            <input
              class="input"
              v-model.trim="password"
              type="password"
              placeholder="Password"
            />
            <div v-if="formType === 'register'" class="reg-pass-tips">
              The username consists of letters, numbers, and underscores, and
              cannot exceed 15 characters in length
            </div>
          </div>
        </div>

        <div
          class="login-btn"
          :class="{ 'login-loading': loginLoading }"
          @click="saveForm"
        >
          <div class="global-pending"></div>
          <div>{{ formType === 'login' ? 'Log in' : 'Register' }}</div>
        </div>
      </div>

      <div class="section">
        <div class="separator">or</div>
        <div class="section-title">Quick Login</div>
        <div class="quick-login-options">
          <div class="login-option" @click="redirectTwitter">
            <div class="login-x"></div>
          </div>
          <div class="login-option" @click="redirectTg">
            <div class="login-tg"></div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="separator">or</div>
        <div class="section-title">Wallet Login</div>
        <WalletOptions />
      </div>
    </div>
  </GlobalDialog>
</template>

<style lang="scss" scoped>
  .content {
    .section {
      margin-bottom: 40rpx;
    }
    .section-title {
      font-size: 28rpx;
      font-weight: 900;
      margin-bottom: 20rpx;

      .reg-tips {
        font-size: 28rpx;
        font-weight: 400;
        color: #999999;
        display: flex;
        justify-content: center;
        text-align: center;

        .reg-btn {
          color: #ffffff;
          cursor: pointer;
          text-decoration: underline;
          margin-left: 5rpx;
        }
      }
    }
  }

  .form {
    .form-item {
      margin-bottom: 30rpx;
      .input {
        box-sizing: initial;
        width: auto;
        padding: 12rpx 25rpx;
        height: 64rpx;
        box-sizing: initial;
        font-size: 28rpx;
        font-weight: 400;
        border-radius: 64rpx;
        border: 2rpx solid rgba(153, 153, 153, 1);
        &:focus-within {
          border: 2rpx solid rgba(82, 211, 251, 1);
        }
      }

      .reg-pass-tips {
        font-size: 24rpx;
        font-weight: 400;
        line-height: 28rpx;
        color: rgba(16, 227, 235, 1);
        margin-top: 10rpx;
      }
    }
  }

  .login-btn {
    border-radius: 40rpx;
    background: linear-gradient(
      90deg,
      rgba(5, 250, 234, 1) 0%,
      rgba(126, 0, 245, 1) 100%
    );
    font-size: 28rpx;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64rpx;
    margin-bottom: 10rpx;
    cursor: pointer;
    .global-pending {
      display: none;
      margin-right: 10rpx;
    }
    &.login-loading {
      opacity: 0.6;
      .global-pending {
        display: block;
      }
    }
  }

  .separator {
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
    &::after {
      content: '';
      max-width: 280rpx;
      display: block;
      width: 100%;
      border: 2rpx dashed rgba(102, 102, 102, 1);
    }
    &::before {
      content: '';
      max-width: 280rpx;
      display: block;
      width: 100%;
      border: 2rpx dashed rgba(102, 102, 102, 1);
    }
  }

  .quick-login-options {
    display: flex;
    align-items: center;
    .login-option {
      cursor: pointer;
      width: 64rpx;
      height: 64rpx;
      border-radius: 50%;
      background: rgba(153, 153, 153, 0.4);
      margin-right: 30rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      .login-x {
        width: 32rpx;
        height: 28rpx;
        background: url('/static/images/account/login-x.svg') no-repeat center /
          contain;
        filter: brightness(0) invert(1);
      }
      .login-tg {
        width: 36rpx;
        height: 32rpx;
        background: url('/static/images/account/login-tg.svg') no-repeat center /
          contain;
        filter: brightness(0) invert(1);
      }
    }
  }
</style>
