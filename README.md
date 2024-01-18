## 노션 링크

[kernel square 노션 링크](https://www.notion.so/KernelSquare-96828531139a49a2983ec2a09a0df0ae?pvs=4)

## 주요 기술 스택

- <img src="https://img.shields.io/badge/Nextjs-ffffff?logo=nextdotjs&logoColor=000" />
- <img src="https://img.shields.io/badge/tailwindcss-ffffff?logo=tailwindcss" />
- <img src="https://img.shields.io/badge/axios-ffffff?logo=axios&logoColor=ffffff" />
- <img src="https://img.shields.io/badge/react query-ffffff?logo=reactquery" />
- <img src="https://img.shields.io/badge/recoil-ffffff?logo=recoil" />
- <img src="https://day.js.org/img/logo.png" width="18" height="18" /> <img src="https://img.shields.io/badge/dayjs-ffffff" />
- <img src="https://img.shields.io/badge/msw-ffffff?logo=mockserviceworker" />
- <img src="  
  https://ui.toast.com/icons-afac2d19e8aa82377b3f18a704d4acf5/favicon.ico" width="18" height="18" /> <img src="https://img.shields.io/badge/toast ui editor-ffffff" />
- <img src="https://airbnb.design/wp-content/themes/airbnbdesign/microsites/lottie/static/images/favicon.ico" width="18" height="18" /> <img src="https://img.shields.io/badge/Lottie-ffffff" />

## 관련 링크(초대를 해야 볼 수 있어서 링크 누르셔도 보지 못하실수 있음)

- [whimsical 링크](https://whimsical.com/kernelsquare-wireframe-Fg9Nsfmc73hfrCAD7waAxH)
  - 백엔드와 같이 작업하였으며, px 단위까지 맞추거나 반응형 등은 고려하지 않은 대략적인 와이어 프레임 입니다. 별도의 타이포그래피나 컬러 토큰 등은 디자이너가 있는 상황이 아니고 프론트 팀이 별도로 디자인 시스템까지 구축하기에는 시간이 소요될 것 같아서 진행하지 못했습니다. 다만, 재사용할 것 같은 색상들에 대해서는 tailwindcss나 css 변수로 선언해서 사용하고 있습니다
- [피그마 링크](https://www.figma.com/file/C06BL9d90R8S0aGZ7g9u2R/Untitled?type=design&node-id=0%3A1&mode=design&t=O7pBHyVWpDTRgJ0M-1)
  - 유저 프로필 페이지를 확장할 경우 대략적으로 어떤 레이아웃으로 구성하면 좋을지에 대해 논의해서 만들었습니다.
  - 별도의 피그마로 만든 계기: 요청으로 인해 유저 프로필 페이지를 만들었지만, 현재는 api에서 주는 데이터가 한정적이며 이후 시간이 될 경우 백엔드와 협업하여 개선될 수 있어서 간략하게 미리 구상해 보았습니다 (지금 적용은 못하지만, 백엔드도 시간이 될 경우 나중에 논의해서 진행할 의사가 있음을 확인했습니다)
  - 이후 작성이 필요한 것들이 있다면 추가하고 있는 중 입니다

## 팀원 역할

> 특정 역할을 나누지 않고 주로 페이지 단위로 이슈를 만들어서 서로 배정 후 진행을 했기 때문에, 페이지 위주로 역할을 작성했습니다

| <a href="https://github.com/Ryan-TheLion" target="_blank"><img src="https://avatars.githubusercontent.com/u/110394773?v=4" width="100" height="100" /></a> | <a href="https://github.com/JeongwooHam" target="_blank"><img src="https://avatars.githubusercontent.com/u/123251211?v=4" width="100" height="100" /></a> |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                                    **[Ryan-TheLion](https://github.com/Ryan-TheLion)**                                                     |                                                     **[JeongwooHam](https://github.com/JeongwooHam)**                                                     |
|                                                                    레이아웃, 네비게이션                                                                    |                                                                        마이페이지                                                                         |
|                                                               질문 리스트, 질문 수정 페이지                                                                |                                                                     질문 상세 페이지                                                                      |
|                                                            api 커스텀 응답 코드 상수 모듈 작업                                                             |                                                            api 커스텀 응답 코드 상수 모듈 작업                                                            |
|                                                                     유저 프로필 페이지                                                                     |                                                                             -                                                                             |

## 진행 상황

- 기본 레이아웃, 네비게이션(반응형)
- LottieFiles 에서 제공해주는 무료 lottie json 파일을 이용하여 필요하다고 생각될 경우 작업하면서 추가하여 일부 애니메이션을 처리
- 백엔드와 협업하여 OAuth 를 해야 되는 것을 고려하여 next auth 사용하지 않고(next auth에서 백엔드에서 설정한 별도의 api 와 매칭해서 커스텀할 수 있는지 확인이 필요한 부분, 현재는 풀스택에 적합하고 별도로 커스텀하기에는 어렵다고 생각되어 사용하지 않고 있음), 유 저 상태관리를 직접 구현하여 관리
- 로그인, 로그아웃 페이지
  - 모달을 통해 로그인을 해서 페이지 이동 없이 로그인을 할 수 있도록 함
  - Nextjs 병렬 라우팅은 하드 네비게이션(새로고침, 직접 주소입력)시 이전 화면을 유지하지 못하는 것 같아서, 사용하지 않고 별도의 모달 컴포넌트로 구현 함
  - 로그아웃은 별도의 페이지 없이 드롭다운 메뉴 클릭으로 진행하고 유저 상태를 초기화하여 진행
- 회원가입 페이지
- 마이 페이지, 마이 페이지 수정
- 유저 프로필 페이지
- 전체 질문글 페이지
- 질문 작성 / 상세 / 수정 페이지
  - [toast ui editor](https://ui.toast.com/tui-editor) 를 통해 에디터 제공

## 성능 최적화를 위해 시도한 점

- tailwindcss 를 최대한 활용해 빌드 타임에 만들어진 css 파일을 사용하는 것으로 css 적용 시간을 줄이려고 함
  - css-in-js 를 적용해야 되는 상황이 있을 수도 있기 때문에, emotion을 설치하기는 하였으나 인라인 style로 처리해도 괜찮은 경우라면 인라인 스타일을 적용
- 문자열 처리시 정규표현식 활용
- 리렌더링을 최소화 하기 위해 useCallbak 등을 사용
- debounce를 통해 불필요한 요청 줄이기

## 트러블 슈팅

- [toast ui editor 트러블 슈팅 깃헙 Wiki](<https://github.com/KernelSquare/Frontend/wiki/@toast%E2%80%90ui-editor-%EC%9D%B4%EC%8A%88-(with-Next.js-14-app-router)>) (문제를 발견하고 해결한 과정의 기록)

## 질문 사항

- Nextjs 를 하면서 Sentry를 도입해보고 싶은데, 도입했을 때 신경써야 되는 점 등의 인사이트로 알려주실만한 내용이 있으신지 궁금합니다.
- 백엔드 팀과 협업하여 웹소켓 기능(채팅)을 stomp, sockjs로 구현(백엔드 요청)하려고 합니다. 개발 효율성을 위해 MSW와 같은 목서버를 활용해서 진행하고 싶은데, 찾아보았을 때에는 socket.io 을 지원해주는 라이브러리들이 많이 보였던 것 같습니다. 괜찮은 웹소켓 목업 라이브러리가 있는지 궁금하고, 직접 Nextjs에 간단한 웹소켓 서버를 만들어서 개발모드를 실행할 때 같이 서버를 띄워서 진행하는 것이 오히려 더 좋을지 궁금합니다.
- 나중에, github action 과 docker 를 활용하여 aws ec2 에 자동 배포를 진행해보고 싶은데, 그 때 궁금한 것이 있을 경우 문의드려도 괜찮을까요? 수동으로 도커 이미지를 빌드하고 ec2에서 pull 받아서 컨테이너를 구동하는 것은 해보았으나, 이번 프로젝트를 통해 자동화를 적용해보고 싶어서 그렇습니다
- 프론트엔드 개발자와 협업을 하실 때 멘토님께서 신경쓰시는 부분이나, 선호하시는 협업 도구 및 방식은 어떤 것인지 궁금합니다.
  - 이슈를 반영하고 시간이 지나서 얘기를 나누었을 때 같은 역할을 하는 컴포넌트를 중복으로 각자 만든 것을 알게되었습니다. 원활한 소통이 되지 못해서 생긴 문제라고 생각하여 협업방식을 개선하고 싶습니다.
  - 비대면으로 일하는 시간이 많고, 특별한 이유가 없으면 서로 DM을 주고 받지 않아서 그런거 같은데, 매일 시간을 정해서 진행상황과 의견을 나누는 시간을 고정으로 가지는 것(데일리 스크럼)이 좋을까요?

## 방향성

- 사용자 경험 개선

  - 직관적이고 효율적인 UI 구현하기
  - 다양한 use-case 파악을 통해 UI/UX 개선 방안 고민해보기

- 협업 강화 / 백엔드와의 지속적인 소통 및 프론트엔드 팀원 간 협업 방식 개선하기

- 탄력적인 개발

- 스프린트 방식을 통해 생산적으로 태스크 관리하기

- 개발 효율성 향상을 위한 기술 스택 도입 적극 고려해보기

## 구현 목표(2월 시연)

- [ ] 검색 페이지
- [ ] 예약 페이지
- [ ] 채팅(멘토 커피챗) 페이지
- [ ] 소셜 로그인
