import Head from "next/head"
import { useEffect } from "react"

declare const window: typeof globalThis & {
  kakao: any
}

export default function KakaoMapPage() {
  useEffect(() => {
    const script = document.createElement("script") // <script></script>
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP}&autoload=false`

    document.head.appendChild(script)

    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map") // 지도를 담을 영역의 DOM 레퍼런스
        const options = {
          // 지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
          level: 3, // 지도의 레벨(확대, 축소 정도)
        }

        let map = new window.kakao.maps.Map(container, options) //지도 생성 및 객체 리턴
      })
    }
  }, [])

  // 마커를 담을 배열입니다
  let markers: number[] = []

  let mapContainer = document.getElementById("map"), // 지도를 표시할 div
    mapOption = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    }

  // 지도를 생성합니다
  let map = new window.kakao.maps.Map(mapContainer, mapOption)

  // 장소 검색 객체를 생성합니다
  let ps = new window.kakao.maps.services.Places()

  // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
  let infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 })

  // 키워드로 장소를 검색합니다
  searchPlaces()

  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces() {
    let keyword = (document.getElementById("keyword") as HTMLInputElement).value

    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!")
      return false
    }

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB)
  }

  // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
  function placesSearchCB(data, status, pagination) {
    if (status === window.kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data)

      // 페이지 번호를 표출합니다
      displayPagination(pagination)
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.")
      return
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.")
      return
    }
  }

  // 검색 결과 목록과 마커를 표출하는 함수입니다
  function displayPlaces(places) {
    let listEl = document.getElementById("placesList"),
      menuEl = document.getElementById("menu_wrap"),
      fragment = document.createDocumentFragment(),
      bounds = new window.kakao.maps.LatLngBounds(),
      listStr = ""

    // 검색 결과 목록에 추가된 항목들을 제거합니다
    removeAllChildNods(listEl)

    // 지도에 표시되고 있는 마커를 제거합니다
    removeMarker()

    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      let placePosition = new window.kakao.maps.LatLng(
          places[i].y,
          places[i].x,
        ),
        marker = addMarker(placePosition, i, ""),
        itemEl = getListItem(i, places[i]) // 검색 결과 항목 Element를 생성합니다

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition)

      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      ;(function (marker, title) {
        window.kakao.maps.event.addListener(marker, "mouseover", function () {
          displayInfowindow(marker, title)
        })

        window.kakao.maps.event.addListener(marker, "mouseout", function () {
          infowindow.close()
        })

        itemEl.onmouseover = function () {
          displayInfowindow(marker, title)
        }

        itemEl.onmouseout = function () {
          infowindow.close()
        }
      })(marker, places[i].place_name)

      fragment.appendChild(itemEl)
    }

    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl?.appendChild(fragment)
    if (menuEl) menuEl.scrollTop = 0

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds)
  }

  // 검색결과 항목을 Element로 반환하는 함수입니다
  function getListItem(index, places) {
    let el = document.createElement("li"),
      itemStr =
        '<span class="markerbg marker_' +
        (index + 1) +
        '"></span>' +
        '<div class="info">' +
        "   <h5>" +
        places.place_name +
        "</h5>"

    if (places.road_address_name) {
      itemStr +=
        "    <span>" +
        places.road_address_name +
        "</span>" +
        '   <span class="jibun gray">' +
        places.address_name +
        "</span>"
    } else {
      itemStr += "    <span>" + places.address_name + "</span>"
    }

    itemStr += '  <span class="tel">' + places.phone + "</span>" + "</div>"

    el.innerHTML = itemStr
    el.className = "item"

    return el
  }

  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position, idx, title) {
    let imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new window.kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new window.kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new window.kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new window.kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imgOptions,
      ),
      marker = new window.kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      })

    marker.setMap(map) // 지도 위에 마커를 표출합니다
    markers.push(marker) // 배열에 생성된 마커를 추가합니다

    return marker
  }

  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null)
    }
    markers = []
  }

  // 검색결과 목록 하단에 페이지번호를 표시는 함수입니다
  function displayPagination(pagination) {
    let paginationEl = document.getElementById("pagination"),
      fragment = document.createDocumentFragment(),
      i

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl?.hasChildNodes()) {
      if (paginationEl.lastChild !== null) {
        paginationEl.removeChild(paginationEl.lastChild)
      }
    }

    for (i = 1; i <= pagination.last; i++) {
      let el = document.createElement("a")
      el.href = "#"
      el.innerHTML = String(i)

      if (i === pagination.current) {
        el.className = "on"
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i)
          }
        })(i)
      }

      fragment.appendChild(el)
    }
    paginationEl?.appendChild(fragment)
  }

  // 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
  // 인포윈도우에 장소명을 표시합니다
  function displayInfowindow(marker, title) {
    let content = '<div style="padding:5px;z-index:1;">' + title + "</div>"

    infowindow.setContent(content)
    infowindow.open(map, marker)
  }

  // 검색결과 목록의 자식 Element를 제거하는 함수입니다
  function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild)
    }
  }

  return (
    <div>
      {/* <Head>
                <script type="text/javascript" 
                src="//dapi.kakao.com/v2/maps/sdk.js?appkey=f2354913af21df03ad4d0ed912052c38"></>
            </Head> */}
      <div>
        <div id="map" style={{ width: "500px", height: "400px" }}></div>
      </div>
    </div>
  )
}
