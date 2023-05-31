type ButtonLoadingProps = {
  primary?: boolean;
  onlyIcon?: boolean;
};

const Icons = {
  buttonLoading: ({ primary = true, onlyIcon = false }: ButtonLoadingProps) => {
    if (onlyIcon)
      return primary ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <path
            opacity="0.2"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="white"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.5523 21.5523 13 21 13C20.4477 13 20 12.5523 20 12C20 7.58172 16.4183 4 12 4Z"
            fill="url(#paint0_linear_2418_16628)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2418_16628"
              x1="12"
              y1="12"
              x2="12"
              y2="20"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="white" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin"
        >
          <path
            opacity="0.15"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="#0F172A"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.5523 21.5523 13 21 13C20.4477 13 20 12.5523 20 12C20 7.58172 16.4183 4 12 4Z"
            fill="url(#paint0_linear_2418_17078)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2418_17078"
              x1="12"
              y1="12"
              x2="12"
              y2="20"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#64748B" />
              <stop offset="1" stop-color="#64748B" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
      );

    return primary ? (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <path
          opacity="0.2"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.31812 13.6819 3.33335 10 3.33335C6.31811 3.33335 3.33334 6.31812 3.33334 10C3.33334 13.6819 6.31811 16.6667 10 16.6667ZM10 18.3334C14.6024 18.3334 18.3333 14.6024 18.3333 10C18.3333 5.39765 14.6024 1.66669 10 1.66669C5.39763 1.66669 1.66667 5.39765 1.66667 10C1.66667 14.6024 5.39763 18.3334 10 18.3334Z"
          fill="white"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10 3.33335C6.31811 3.33335 3.33334 6.31812 3.33334 10C3.33334 13.6819 6.31811 16.6667 10 16.6667C10.4602 16.6667 10.8333 17.0398 10.8333 17.5C10.8333 17.9603 10.4602 18.3334 10 18.3334C5.39763 18.3334 1.66667 14.6024 1.66667 10C1.66667 5.39765 5.39763 1.66669 10 1.66669C14.6024 1.66669 18.3333 5.39765 18.3333 10C18.3333 10.4603 17.9602 10.8334 17.5 10.8334C17.0398 10.8334 16.6667 10.4603 16.6667 10C16.6667 6.31812 13.6819 3.33335 10 3.33335Z"
          fill="url(#paint0_linear_2418_16642)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2418_16642"
            x1="10"
            y1="10"
            x2="10"
            y2="16.6667"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ) : (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="animate-spin"
      >
        <path
          opacity="0.15"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.99999 16.6667C13.6819 16.6667 16.6667 13.6819 16.6667 10C16.6667 6.31812 13.6819 3.33335 9.99999 3.33335C6.31809 3.33335 3.33332 6.31812 3.33332 10C3.33332 13.6819 6.31809 16.6667 9.99999 16.6667ZM9.99999 18.3334C14.6024 18.3334 18.3333 14.6024 18.3333 10C18.3333 5.39765 14.6024 1.66669 9.99999 1.66669C5.39762 1.66669 1.66666 5.39765 1.66666 10C1.66666 14.6024 5.39762 18.3334 9.99999 18.3334Z"
          fill="#475569"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.99999 3.33335C6.31809 3.33335 3.33332 6.31812 3.33332 10C3.33332 13.6819 6.31809 16.6667 9.99999 16.6667C10.4602 16.6667 10.8333 17.0398 10.8333 17.5C10.8333 17.9603 10.4602 18.3334 9.99999 18.3334C5.39762 18.3334 1.66666 14.6024 1.66666 10C1.66666 5.39765 5.39762 1.66669 9.99999 1.66669C14.6024 1.66669 18.3333 5.39765 18.3333 10C18.3333 10.4603 17.9602 10.8334 17.5 10.8334C17.0398 10.8334 16.6667 10.4603 16.6667 10C16.6667 6.31812 13.6819 3.33335 9.99999 3.33335Z"
          fill="url(#paint0_linear_2418_17152)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_2418_17152"
            x1="9.99999"
            y1="10"
            x2="9.99999"
            y2="16.6667"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#64748B" />
            <stop offset="1" stop-color="#64748B" stop-opacity="0" />
          </linearGradient>
        </defs>
      </svg>
    );
  },
  settings: () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M9.35285 4.08139C10.0266 1.3062 13.9734 1.3062 14.6471 4.08139C14.7628 4.5579 15.3088 4.78402 15.7275 4.52888C18.1662 3.04293 20.9571 5.83376 19.4711 8.27251C19.216 8.69125 19.4421 9.23717 19.9186 9.35285C22.6938 10.0266 22.6938 13.9734 19.9186 14.6471C19.4421 14.7628 19.216 15.3088 19.4711 15.7275C20.9571 18.1662 18.1662 20.9571 15.7275 19.4711C15.3088 19.216 14.7628 19.4421 14.6471 19.9186C13.9734 22.6938 10.0266 22.6938 9.35285 19.9186C9.23717 19.4421 8.69125 19.216 8.27252 19.4711C5.83376 20.9571 3.04293 18.1662 4.52889 15.7275C4.78402 15.3088 4.5579 14.7628 4.08139 14.6471C1.3062 13.9734 1.3062 10.0266 4.08139 9.35285C4.5579 9.23717 4.78402 8.69125 4.52888 8.27251C3.04293 5.83376 5.83376 3.04293 8.27252 4.52888C8.69125 4.78402 9.23717 4.55789 9.35285 4.08139ZM12.7036 4.55323C12.5245 3.81559 11.4755 3.81559 11.2964 4.55322C10.8612 6.34596 8.80726 7.19673 7.23186 6.23681C6.58365 5.84185 5.84185 6.58364 6.23681 7.23185C7.19673 8.80726 6.34596 10.8612 4.55322 11.2964C3.81559 11.4755 3.81559 12.5245 4.55323 12.7036C6.34596 13.1388 7.19673 15.1927 6.23682 16.7681C5.84186 17.4164 6.58365 18.1581 7.23186 17.7632C8.80726 16.8033 10.8612 17.654 11.2964 19.4468C11.4755 20.1844 12.5245 20.1844 12.7036 19.4468C13.1388 17.654 15.1927 16.8033 16.7681 17.7632C17.4164 18.1581 18.1581 17.4164 17.7632 16.7681C16.8033 15.1927 17.654 13.1388 19.4468 12.7036C20.1844 12.5245 20.1844 11.4755 19.4468 11.2964C17.654 10.8612 16.8033 8.80726 17.7632 7.23185C18.1581 6.58364 17.4164 5.84185 16.7681 6.23682C15.1927 7.19673 13.1388 6.34596 12.7036 4.55323ZM12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12Z"
          fill="white"
        />
      </svg>
    );
  },
  arrowDown: () => {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z"
          fill="#94A3B8"
        />
      </svg>
    );
  },
  check: () => {
    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.0366 4.7636C15.3881 5.11508 15.3881 5.68492 15.0366 6.0364L7.83659 13.2364C7.48512 13.5879 6.91527 13.5879 6.5638 13.2364L2.9638 9.6364C2.61233 9.28492 2.61233 8.71508 2.9638 8.3636C3.31527 8.01213 3.88512 8.01213 4.23659 8.3636L7.2002 11.3272L13.7638 4.7636C14.1153 4.41213 14.6851 4.41213 15.0366 4.7636Z"
          fill="#6366F1"
        />
      </svg>
    );
  },
};

export default Icons;
