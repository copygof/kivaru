// @ts-nocheck
function wrapPromise(promise) {
  let status: any = "loading"
  let result: any = ""
  let suspender = promise.then(
    (data: any) => {
      status = "success"
      result = data
    },
    (error: any) => {
      status = "error"
      result = error
    }
  )

  return {
    read() {
      if (status === "loading") {
        throw suspender
      } else if (status === "error") {
        throw result
      } else if (status === "success") {
        return result
      }
    },
  }
}

export default function createResource(fetchFn: any) {
  // return (...args) => wrapPromise(fetchFn(...args))
  let status: any = "loading"
  let result: any = ""
  let suspender
  let isStartLoading = false

  return {
    read(...args) {
      if (!isStartLoading) {
        suspender = fetchFn(...args).then(
          (data: any) => {
            status = "success"
            result = data
          },
          (error: any) => {
            status = "error"
            result = error
          }
        )
      }

      if (status === "loading") {
        throw suspender
      } else if (status === "error") {
        throw result
      } else if (status === "success") {
        return result
      }
    },
  }
}

// export const unstable_createResource = (somethingThatFetches) => {
//   let cache

//   const ApiResource = {
//     read(...args) {
//       if (!cache) {
//         /**
//          * Throws the promise that modifies the cached data
//          */
//         const toResolve = {
//           toResolve: somethingThatFetches(...args).then((data) => {
//             cache = data
//           }),
//         }

//         throw toResolve
//       }

//       return cache
//     },
//   }

//   return ApiResource
// }
