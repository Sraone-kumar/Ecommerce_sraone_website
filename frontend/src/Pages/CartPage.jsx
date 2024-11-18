import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import clsx from "clsx";
import { XMarkIcon } from "@heroicons/react/24/solid";
export default function CartPage() {
  return (
    <div className="flex flex-col gap-5 min-h-screen w-full">
      <div id="cartItemsComponent" className="flex p-2 w-full flex-col">
        <div
          id="cartHeadings"
          className="flex border-b-2 font-bold items-center justify-between"
        >
          <div className="flex w-[40%] ">Item</div>
          <div className="min-w-[100px] flex justify-center">price</div>
          <div className="min-w-[200px] flex justify-center">Quantity</div>
          <div className="min-w-[100px] flex justify-center">Total</div>
        </div>
        <div
          id="item"
          className="flex py-2 border-b-2 items-center justify-between"
        >
          <div className="flex px-2 gap-3 items-center w-[40%] py-4 ">
            <div className=" min-w-[100px] h-[100px] bg-black">
              <img
                className="w-full h-full object-cover"
                src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUREhIVFRUVFhgVFxUVFRUWFRUXFRcYFhUXFhUYHSggGRolHRUWITEhJSkrLi4uFx8zODMtNygtLi0BCgoKDg0OGxAQGi8lICUtLy8yLS0tLzUvLS8tLS01LS0tLS0rNS0tLSswLS0rLS0tLS0tLS0tKy0tLS0tLS0tLf/AABEIAKgBKwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAAAQMEBQYHAgj/xABCEAABAwIEAwUFBQUHBAMAAAABAAIRAyEEBRIxBkFREyJhcYEykaGxwUJScrLwByRigtEUIzM0Y5LhJTVD4hVzwv/EABoBAQADAQEBAAAAAAAAAAAAAAACAwQFAQb/xAAyEQACAQIEAggFBQEBAAAAAAAAAQIDEQQSITFRcQUTIjNBYbHBBjSh0fAyUnKBkUIV/9oADAMBAAIRAxEAPwDpaEIXxx1BEJUiAEIQgBCEIASoQgEQlQgEQlQgBCEIAQhCAEIQgBCEIAQhCAEIQgBCEIAQhCAEISIBUJEIBUJEIBUJEIAQhCAVCEIAQhIgFQhCAE1iMQym0ue4NaOZMBOOMXOwWCzfHGu8uPs7Mb0HWOpVtOnnZKMczLnF8Y0gYpNNTx9lv9Sn8DnlSoARTb5Ak/FYanhwD4X3WmyhwpiNv+Vq6qCWiLurika2hULhJaQfh6FOKFhMcOanOjcbKirRssyKJKzEQhCzngiEJUAiEIQFXnObOolrW0w8uBN3aYj0umcuzd9SoxpawBxAsSSJ+Cu//j2VCHPYHEbTynwU/D4GmNmNEdGhfU4OhhVQjnp3lbf8ZxsQsTKq3CpaN9ilwVdzi7VFjaJ8d1KV2cKwiC0AeAgquxWCLLi7evTzXM6RwtqjqUo2jwXgbcJJqChUld8SKhCFyTYCEIQAhCEAIQhACEIQAhCEAIQhACEIQCpEqEAiEqRAKkQChAQM/qFuHqkfdj/dAPzXPX4iy6HnrJw1Yf6bj/tGr6Ll73zeVuwyvB8y2kTcI7Ubq2w7zaf1HP4KkwwVjRedr3/RVxe0W9HETv1381oMsxUjST6/JZSi0k9Ov66qxwTyCLc9p8xHyXj10IOKehqULyx0gFelzWrOxmBCAErmEbgjzCWYETtNnVMPqaRPiAvdPFzyXSwdGnbPP+imq5bIn0gpLSodPEBTWgLsRmnsZGmh1l7JSyEU4WS4l4mrYR8O0FrtWlmkkxfSSQbyAvZ1FFXZAsMzxFFtTSKjA77TdQkHlI5JprgdiD5GVympj3ObqbLnEm1+7BIuQb20q+4axT6dQve4NZpAeCDd0CAByI3PO/OV89Xhmk5JW8jRDEWtFm6SKuzXOG0dAiXVCA2e60SQJc47C6qMfnpcHQ51MDTpMRqOziTuAOm8LPGDlsXzrRiad7wBJMAbkpQVz7GZhV0uZTqagX7hwh8DvQObdUx1hWGSZo6m0dpUaNQktILojoG7FSlScSpYpX1Rski80agc0OGzgCJtY3Fl6VRqBCEIAQhCAEIQgBCEIBVV5rmlNks1O1AT3Ilt7EkkCJ6nqvOeZ23D6WhhqVHkBrRy1HSC48hJhctqV62KxENjW975Jhpa0HUXOmdLALnfbnK14fDufalsUVattFuabFcQvce7VIeGkOLfZN4BDb7+ITx4ixINMBjpDQ1xLmgPd4zPVY12Fax+l7+0kdzsodLiRBIMST68leYOjUPcdhGESBLiWz/LBK29VG2xic5J7ljWz3Fhj31O0psFy8MEgOtAFpEAmdxAuLla7KM0p1Wy14cIbBMh0O9nVqAMm36ucYcTBNOm0lomWgve0EWIDdUECQDA5wqrA5i6rVbhqTXd8gvAkNaRJsBJ0ibE39Aq50IzVkicK0ou+51bEtBaWzGoFo8yDsuPUyQS0i4MX8OS6LTqvpvpmqW9mwHvmtqdrd3Tqa8NIsTtq392P4kwoGKqlhbpd3wZAB1Rqg7e1KhRpum3Fm+hWjI84dwCtKT2gDmVQYd60GR0mvcGm40kjfcbbKeVuVkbpNKN2PYHDvIkktN7dfMclaYdpbdw1C89eXvU2ph2M0AkAuHToPfCbbSe6dEQOZIDeUbq+VCXAojWi/EtMNVDhbzTyymJxlTCkue2Ggg2LYIPS/NXmPx7Rh3VmmW6QQfMgfVc+vRakr+JCTTeg9TxRLiGq5wNQPEOE+ayOQZg17991q8EyDPip024zXAqqpWKrOmlj20x1J9LXPvTtLCgaR2g1ETEGL7X/wCFExmM7bEVW8mFrAf5Q53zU/CZeC/tHGY2HIRsrFNXtFaHlrR7Q1iHupmHiOc8iOsqmz7jSlQaBqkkCIBMg9Dt8U9+0/Nmswu+mXtZO9nAg28lx0Zu6mP7s95t9rEeS0Ob/wCNjNNvgaPMuN8WXjs3P6S0GIn2m/dJHNVfEGdVK1RtSu+XRM7k8ohtrCPeVEoY6rie/VhrPsiLnrpHS3OyTG5PrMy6OQc4CPLaF5lS0bfqShhKs45rWXF6Frk+NayQAAHAkEnc7je14FlrcFjWdnLWy8GQIERyJ9x9y5Vi39k4te06haDBAg2IPorbIM4LDUdP925rdQEzqbq0Bp695w9ZUJUnYonSlDc0GPzp+JeW1Za5p7tjoaLAiN7263UkFxpaTUaA4wOZmD9jf0UHNsdS7AVtJbbeBINu7qi43UMVu1Da7SWvAJAaDFhMRMfALPKnqmloVNt7iVMTSFTS+o8AABkC+l3slw6kX3WjxdKn3C0kh1PTpbGoaRckTYjy5KvzAECdLC2oA3U0uJa4tEhzTyJkiPKZUChk9XW50nuuL6ZpkAktkNGm5Ddu70Um4yWuh4bHL82dQJbUgg6NIkaiBYxfePmtJhswa86T3XaO0g8mzvKweYVC9ge+mW1dGlxBMuMAu1AyG3HJRsgxOJa1rqjH06dTUG1C4HYxETIBMC8A7quVDRvcup1pQ0OoNcCJBkdQlWfyB7qY0u06S4yRMSbi52WgWacHF6m6lUzq4IQhQLAQhCAVCEIDF8ZN7N3aOcQKklx+41gDKZaRfUHP1x/DP2VVZ0adKgQGuL3EOqNYAGNdDGnU/SZBcA4AR7XKb6nijKHYh1Jv2C4CoYJIDe83n7JdANuh2BWN4+xRpmnQY+NJGotkAltha/s6jBkmS6TIgdOhJSUVfUyVVa7KbJ2N1ue/V3byNOx335j6++7wmfU3VGMphzb2OmTIkgASSeZvYT4XhUMO2lQM+0RfmZdMDykC3gfNGBpscT3T2ga/Y3LRphregsWz0BC1syC1Mtqis+vTonsw0uJBsCZkuI2gTY9QkyXLqhrCqztNInU9rZB21Nc4kACDfcwFsMvoufgzS0Q8VS0iD/iau8XNcIMEzfUNuYAHnBZHUo06hOrQ6AKYcdbGgXqdDUnfa0jmVnVVa35FsqT0sZXNsS9lY0iA8N7zdYMHUdbhAt7TnEOAERFoVrTwNOvTNVrpaGSSdhpPfaSLAiTfwnYqyp6K9APcwdow6NdoLYGo7HcAEeInrNdhXCiXMaRFW8ueOzJ2h83HLbkZFwpcGVrR6FfRoUm2JnYSdpNhPLdSsPjYe0UyJabmW93lYbddz6Kqzjh7syHudppuJ7MGC0Ebt1tlp5w64O+8hV+TNMOBMbyZ2AE7eVvVaU0tjfGreN5s1mFz9/Zh1cHtG1HtIaALODXtM87l49Fc183Y6kHkS1zgSHdQHQDHIuiVz/IHEmq2oXOksLCbkNa7QIn+FwC0mHY006jI1WPdE2LRvb093OVNvU09SpwbSKTjHM+3rNNOzNLZYLNBA0mB6H3r3T4jjA1sM8mZa6nvZuoF4PTYEeZWdFcucGtJB1m4LAJFtyLbH4JMHVxAfYyXamhxsHB4I0lxECZI8kdFS/UUxVjzhs2psqio5z3QZsbjy5brs3A3EZxGFFWoQXtDtYAjYki0ROmDZcRo5fSbiBSrFtMtdpfrnQ119yySR4ifBWGWZ6+liIw4PYgOAF3EBwILXujvRJgnwXmIo54W4BtM3OUZ8KbKtatu+o54bzJfBA9AFW4rivFVSYeWN5NaY953Ko8FmLDUJfdrbAfO3X+i91cQ1ziW2WB0bLQ6+DhCOsldl1hse8m7yfMkz5qVxHwXQqYRmMaezql41MYAG1Kc97uiwd4j1UjIOEq9ZrahcxjHXBJ1Oj8IsPUra4XhimGBtR76gbyJ0t8YASjTqJtrgMfiMLNKLez1svpc4v22p9gByaG3IA2EBWQ4TxWI7zabxP3wQBPMiPmuy5fkeGoSaVGmw8y1o1HzdzUwtB3BPmfotKpqLzNnOr41VI5Ix0OSYL9lLy4HEYoaYEtYw6rCNIcXQLADZbfKuCMFRAHYB4/1YPzV+54BgABNYuo9rdTRPVSdRcDFlukjLcW8J4dmFrVaLRNMGoKbjqpGDJ7p2gTC5tUrumq8uc0MpAwLROgWDRNzEFdozljqmErtbZz6FQCeppmN/FfO1POKjMQ7UZc4OpvFhsIgjaxaPUKDhn1RnqRszW1GPbQ7VtN9SqY1u1QGar2ZPe28fRJWx9Sg7WyrAEEAtIceRER5neIPPZTaGOdiMNUfRYSafZ62mDUJLg0EQNt/eVm8zoltTs60tiHNIhwbqmWGLchHgAssYXdmikvsTVdiKHaUqgkucKrNQ1tafZMGJHlsqbAY7FA9lUL3NpukUyIGwv5QPmvWEwzmYc1iI0uEki8Ew2B715HEJcXAlolugnS2S0iDcCxjmrV2VlS0PTUuzNulzWOdBjrpMjVAB6EkeisMj4heXtD391lj6kWPWw3VHgq7Hxpp9wC3e2+8dr/CFbdsx73tFFms7Pu0gg82ttAuLjzKzyjGS3EZOOxv2uBEi4KVV+RWotbIJFiRtO/1VgsLVmdWEs0UwQhC8JAhCEBT8R1a/ZllBoEtJdVcYbTbzjmTE7bR5LlApVKwa9xJax4YBcgkd50O2mdM8zqnqV1ricMOFqio7Swthx5gEgW8Tt6rnztbnNewaGGo9zRzEuJJmI2ZTb5Qungn2WY8TuRqFDtKrAXGZALhtqaYG5iO97itVluQvFaoOTSJh9nTOqIgtMCkYM/FSOHsgaCyoe9TDZaHT7UNk9Ly73ALT4agGDSNpt16QesRC8r4m2kRSo31Y9KRzoE9LpUxjqmmm93Rjj7mkrnJXdjW3ZXOc0swZWqVHU4p3LjYOa2bgaS3fwHPoql2Mca9Rr2h9IWJLnN1RbTa+/I8wpPCjeyxNcPkhzddO/dNyHbDcCPTrycoZZIcesn1PM+8ruTSpuxz6FOVeLkiyy7D1KjJew1sIHO1UhVLTScDd1jLgS6Zg2MwICYxXCzjTNRjGPkhxotqPPc5BrhBcRItzAWi4Pf2dBgEAnvExvJ2jy5JriKi/DB2Kw7S5gk1KX3D99v8HXpvttUpcDXLCtRTXiYvLG1KpLqdN2zmO0tcdBvAjwIG6l4THdnq1OAnS4EECzhPjsDO8+6FeZFWc5xqucC551OIsJ6DwG3ooH7QqmHqshzXU61y2tTDYd/DUbbUD13HwN0aqbszXSpVKMOzq+Bzimxoe4hwd3jckhkk7i0nr6K1weY1cAC7R/jjSx50uYWg/wB4NJBEzp5AiB1WfoYwUzBbOncb36ypOY46pimNaAIZAAgAwAdoFzcrajK5aal3gcbopVa1g9unSJaWkk3a+m/2mloOw6TuqV2Ztc4uiIM6eg8Cn8kx7WVGl0kNnUy14Gzg6xHUEKNWoYdz6knTMlgpixJM6R90C+/Re5bodalLYsM8zNleqH0Q4NjTqe1ushu2vQIc+8TuYCbxGHq06QryDTLtEg94Oibt3API7WIVfTwrqIFQzp2No/XJPVsY6rTFFri4DwMNBIJA9QqpU03qaKeIaSsdn/Z/mDidJ5D0BAH9VdcR8TNoDS0aqkbdPE/0XPf2aYl7ane5MIPTbeelt1LOK7Wq9x3LwB79lSo9qxy8bWdODkt9PU23DXEgrufQcf72mAXWgEEAmPIuAK0Opc24FZ+/4h/Jwe73vbZdEa5eTVnYhhavWQb82j24BGuFDmqKhDg3RyI39VT8XZ3/AGenY95239VXc1EXjHiUUmmjTMveNM/dDrH1uuSZ5Vw9eoa2GeJDB2rC0tOpgLdY1C8tAnxHipmckPd2oxFnDVDh7J8TPnyVa3Kn0Huq4gwyoyS5nfLmuIDXNAvEx6JHa5nqTTG6mKdTe1ggNLQ/YEvLgCbxJgyI8D4rYcN8TNczsa+GZIDiyoWgu089U7RIuOvvoexLiKLGdpSn/FIa9om/sOjTv75UKrQdSc9rNcvcQ8uGlkD2Q0z3gJ3n3Qjg7XaszP1sG7Jo0OJzyg1zKeiWEkkzBLtmnTtAkx4+SX+3d6xkTzFx4Ss/WoNFUvJ7ukXgmIA9kdd/erDM8trOeKlIHs3hr2ciA4WEWjrPiqJwi4okP4nCVKjj2MaLm7tOnmWmYEXsPDwWgyJp0TUGlws52qQ+LAyDEwPgsuGV2tOppaJGp02JiBCu8gxjqj24anTpuHV8jV1G4HXxUHohudKypkUmw4OtuDI6fRS0xg8M2mxrGtDQBs2Ynnvf3p9c+Tu20daEcsUgQhCiSBCEIBjGYVlVhp1GhzTuD8D5+KyGc4bRGvugPe5rQT7ERAHU6R4CQFtlCx+WU6xaXj2ZiPFaKFXI9diqrTzrQY4fDxThztQB7pj7PLvTf3Ai4hWibw9EMaGNsGiB6ePNOKqcs0mycVZJAq3iSrpwtU/wx/uIH1VkqTjMH+x1Y6N/O2VKgr1Y816leIdqM35P0Ob9uQ7u2Ja5oPQmLx5CP5lKyjMXAaasBzdnfZePPk7wVMMRyTbsV1X0c6ClufPYPpSeHayrTgaupxG1hDWETsPPkAr1nFbGOIDHO63ABkbXXLDZ4cNpB+K07GnW48jpPvChDCwSIY/p3FOWaDUVa1t/Hz8dSccaxj3GkxzGOOoMJDg2dwDayqM3q/2mqxrqukGYaKYMwCTLi7wU57AVluInmnWY8fZg+4hS6mEHmSM9DprHVpZHU+i+xKxPCFF5kYh4nl2bd+vtKXlWQ0aLw5z3Pi8Oa3T0uL7TO6mNfJBFwQCPIiQvdXqr9DJLpPFPef0X2MvW4XYXOc6rUkkzGkX5rxR4ZptOoVqk+LWlaGoZM/rofkvJao5j3/0cT+/0+xWOyhrmaHVnwb2aBvvzITuWZVToODmPqamnUDLdxBFtMcviVN0JQEuevpLE/vf0+x7wjW0zqaXSSXbge1vsAnqFYMu0XmbmfFMgJYXlluZqmLrVP1TbJ+V5rUoOc+lDS6xMAyJnmpzuKsWf/KfRrB9FStCIXjSe6K1iKsVaM2lzZav4ixR/87/Qx8lDxONfV/xDr/FdRoXoJZcCMq9R7yf+srMRlYfV1kCI2hVOd49wc2kD3WgAeAbJA8gStLiaulpKw9d+qoT5ryR0MBKc223olY23Bzj2T3n7T9N+jR/7FWuYYIVWOZzO3goXD1DRRYOcaiPF1/r8FcMcPcrY7anJxM26zlHj6HOcPQfWrUsNqPfqBh/3Rt4Luma5MyrS7NpLC1uljm2s0d1pHMWC5bwngiMyoHxc73gkrsy4mPm4yil4H3XRmWpTlJ63/Pc5ThMK4u7NzNyWX233LvErX5fwZRpgEk6tzpt8d1PrZVTYQGUS4EyZOoDSZAg3ufkrhrp6+qz1KzavHY00aKUmpoAEqELIbQQhCAEIQgBIhKgBCEIAVPxcf3Ot+EfmarhU3GP+SrfhH5mq2h3sea9SnE9zPk/Q5BXZzCiVCpepMVqcr6pnxMXqRWPutY19/wCUfILKdnBHmtUyn3vRqgVYu2n5wPbaizvFIktK0nZLPcSN2UWyrBNdcrE/h3Ea6DerDoPpdvwI9ys3CQsxwrWh76f3gHDzbb5O+Cv3hylF6EsVTy1X/p4eI3/XL6fFeQUjiZg/r9QnAxRZU9NzwlAPQpwNXprEuQc0N36L3TM8l60Lx2aXI5kx2PD5Ij9ShjV60L25BtHiPJetKdaxDgvLkcxS8QVNNOBzWXwlAvqNb1+W5+Su+I6/eDUzkFCXuqR7IgeZ3+A+Kjuzt4Z9Vh3I1WFrxAU9zgRY3NvqqLtCDsrDBVJPSB81Zc49SNk2PcPsjMqI6NP5XLqC5nkH/daf/wBbvyOXTFw+ke9XL3Z9p8P/ACt/P2QIQhc87gIQhACEIQAhCEAiEIQAhKhAIqbjL/JV/wAI/M1XSouN3Rgq3k387Vdh+9jzXqUYruJ/xfocjK8SvRXhfUnxCPBC0VE3H4Qs8VfMN/5R9FFlOI1X55EsuVFxDTkT+uStlX5u2QPX6Ksow3ZqJmby+t2dVj+QdfyNj8CVu6lOVz54uQt5kuI7Sgx3OIPmLH5L2PA6GPhfLP8AoarNj9eq9KXVohRC2F7JHNb0PQC9sCbBToKiVMWUORC8oRABewF5C9BAxQioYBSqPj6ulhPggiruxkM0qaqjirnK6OimLXNzfqqOgzXUA6m/luVpHWskTs4l2jGCHG1ArDK7N1RuZ9NgqZxmw3JgeqvcNAaPAL1nNxKtC3Ef4dP/AFSmf9N35Hrpa5nw8P8AqVE/wO/K9dMXF6R71cvdn2Pw/wDKf37IEIQuedwEIQgBIlQgBCEIBEIQgFSJUIAWe49P7jV82fnatCs5x+f3J/4mfmCvw3fR5ozYz5ef8X6HKCvKUpAvqD4oRyux7Q/B/RUhVyT32/gP0UZFVb7koCVCzNu3r9FKYVHx5mPVQMtLSaMhiRDitDwdivbpH8Q+R/8Az71TY5veS5VX7Osx3KYPk639D6LzZnaqx6yi15G6rPChl1ylqSd00BcqbOHuONTgXlqcCgVyYhQvRRCEQARCUBBQ8BUvEVeGRO6uisln1bVUjojNmChmqryFyOlcuPl9T9PerRygYMFrB7/f+gpTHkobK15TbH8IzvT0HzVxR2HkFXYYd2et/QWH68VZ0xYeS9exzsTIdyD/ALhQ/C78rl0xc0yL/P0PJ35XLpa4vSXeLl9z7H4e+VfP2QIQhc87wIQhACEJEAqEIQCISoQAhCEALNftC/ybvxs+aELRhe+jzRmxvy8+TOUlIEIX058UDlbVHd9v4D9EIUZbFdT2ZJYUxjRcev0QhVmWH6zO5nTuoJCEIzt0X2EbLL6/aU2u5xB8xunXNQhS8DiVVlqSSPTSvYKVCiUMEqRCET0EqRCHg3iHw0lY6O0qE+KELw6eB0hJlqRZeKZJMczYJUKRZxLYCBA2AhWDdh5BKhes5lbwPeTn9+w58SPgV01CFxeku8XI+z+HflnzBCELnHfBCEIAQhCA/9k="
                alt=""
              />
            </div>
            <div className="flex  flex-col">
              <span className="text-2xl">Product title</span>
              <span className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                earum veritatis et quam? Sequi quidem vel ut. Hic, illum poss
              </span>
            </div>
          </div>
          <div className="min-w-[100px] flex justify-center">
            <span>$300</span>
          </div>
          <div className="min-w-[200px] flex justify-center">
            <DropDownBox width={"100px"} />
          </div>
          <div className="min-w-[100px] flex gap-2 items-center justify-center">
            <span className="font-bold">$100</span>
            <div className="p-1 cursor-pointer hover:bg-slate-900/90 rounded-full bg-slate-900">
              <XMarkIcon className="size-3 fill-white" />
            </div>
          </div>
        </div>
        <div
          id="item"
          className="flex py-2 border-b-2 items-center justify-between"
        >
          <div className="flex px-2 gap-3 items-center w-[40%] py-4 ">
            <div className=" min-w-[100px] h-[100px] bg-black">
              <img
                className="w-full h-full object-cover"
                src="data:image/jpeg;base64,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"
                alt=""
              />
            </div>
            <div className="flex  flex-col">
              <span className="text-2xl">Product title</span>
              <span className="text-sm">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui
                earum veritatis et quam? Sequi quidem vel ut. Hic, illum poss
              </span>
            </div>
          </div>
          <div className="min-w-[100px] flex justify-center">
            <span>$300</span>
          </div>
          <div className="min-w-[200px] flex justify-center">
            <DropDownBox width={"100px"} />
          </div>
          <div className="min-w-[100px] flex gap-2 items-center justify-center">
            <span className="font-bold">$100</span>
            <div className="p-1 cursor-pointer hover:bg-slate-900/90 rounded-full bg-slate-900">
              <XMarkIcon className="size-3 fill-white" />
            </div>
          </div>
        </div>
      </div>
      <div
        id="subTotalComponent"
        className="flex px-4 self-end flex-col w-[300px] "
      >
        <div className="flex  py-3 justify-between p-2">
          <span className="font-bold">Subtotal:</span>
          <span>$1,019.98</span>
        </div>
        <button className="p-2 w-fit hover:bg-slate-900/90 self-end bg-slate-900 rounded-sm shadow flex items-center justify-center text-white">
          checkout
        </button>
      </div>
    </div>
  );
}

function DropDownBox({ optionsListData, width }) {
  let optionsList = [];

  if (optionsListData) {
    optionsList = [...optionsListData];
  } else {
    optionsList = [
      { id: 1, value: "1" },
      { id: 2, value: "2" },
      { id: 3, value: "3" },
      { id: 4, value: "4" },
      { id: 5, value: "5" },
    ];
  }

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(optionsList[0]);

  const filteredOptionsList =
    query === ""
      ? optionsList
      : optionsList.filter((option) => {
          return option.value.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="text-black focus:border-2 focus:border-slate-900 border-2 rounded-md w-fit">
      <Combobox
        value={selected}
        onChange={(value) => setSelected(value)}
        onClose={() => setQuery("")}
      >
        <div className="flex">
          <ComboboxInput
            className={clsx(
              "outline-none focus:outline-none rounded-lg py-1.5 pl-3 text-sm ",
              "w-[" + width + "]"
            )}
            displayValue={(option) => option?.value}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="px-1">
            <ChevronDownIcon className="size-4 fill-slate-900 group-data-[hover]:fill-slate-900/50" />
          </ComboboxButton>
        </div>

        <ComboboxOptions
          anchor="bottom"
          transition
          className={clsx(
            `w-[${width}] rounded-xl border-2 bg-slate-900 p-1 [--anchor-gap:2px] empty:invisible`,
            "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0"
          )}
        >
          {filteredOptionsList.map((option) => (
            <ComboboxOption
              key={option.id}
              value={option}
              className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-white/10"
            >
              <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
              <div className="text-sm/6 text-white ">{option.value}</div>
            </ComboboxOption>
          ))}
        </ComboboxOptions>
      </Combobox>
    </div>
  );
}

function CartIsEmptyComponent() {
  return <div>cart is empty</div>;
}
