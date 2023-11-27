<template>
    <div>
      <!-- 사용자 선택 -->
      <h1>프로필 등록</h1>

      <div>사용자 프로필을 선택하거나 등록하세요.</div>
      <v-select
        :items="users"
        :item-text="userDisplayText"
        item-value="email"
        label="사용자 선택"
        v-model="selectedUser"
      ></v-select>
  
      <!-- 등록 버튼 -->
      <v-btn color="primary" @click="showDialog = true">사용자 등록</v-btn>
  
      <!-- 등록 다이얼로그 -->
      <v-dialog v-model="showDialog" persistent max-width="600px">
            <v-card>
                <v-card-title>사용자 등록</v-card-title>
                <v-card-text>
                    <v-container>
                        <v-form @submit.prevent="registerUser">
                            <v-text-field class="user-input-field"
                                label="이름"
                                v-model="newUser.name"
                                :rules="newUser.nameRules"
                                required
                            ></v-text-field>
                            <v-text-field class="user-input-field"
                                label="이메일"
                                v-model="newUser.email"
                                :rules="newUser.emailRules"
                                required
                            ></v-text-field>
                            <!-- 기타 필드 추가 -->
                        </v-form>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">취소</v-btn>
                    <v-btn color="green darken-1" text @click="registerUser">등록</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
  
<script>
    export default {
        data() {
            return {
                showDialog: false,
                users: [],
                newUser: {
                    name: '',
                    email: '',
                    nameRules: [
                        v => !!v || '이름을 입력해 주세요.'
                    ],
                    emailRules: [
                        v => !!v || '이메일을 입력해 주세요.', // 필수 입력 필드
                        v => /.+@.+\..+/.test(v) || '유효한 이메일 형식이 아닙니다.' // 이메일 형식 검사
                    ]
                },
                selectedUser: null
            }
        },
        methods: {
            userDisplayText(item) {
                return `${item.name} (${item.email})`; // 이름과 이메일을 결합
            },
            registerUser() {
                this.users.push({ ...this.newUser });
        
                this.closeDialog();
            },
            closeDialog() {
                this.showDialog = false;
                this.newUser.name = '';
                this.newUser.email = '';
            }
        }
    }
</script>
<style>
.user-input-field .v-messages__message {
    line-height: 18px;
}
</style>
  